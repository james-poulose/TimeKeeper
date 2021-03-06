import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button } from "react-native";
import { RadioGroup } from "react-native-btr";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserClock } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Grid } from "react-native-easy-grid";
import moment from "moment";
import Helper from "../common/Helper";

export class WorkDayDetails extends Component {
	//params={};
	constructor(props) {
		super(props);
		const params = props.route.params;
		this.state = {
			showTimeIn: false,
			showTimeOut: false,
			showTimeControls: false,
			showTimeRemarks: false,
			timeIn: params.timeIn,
			timeOut: params.timeOut,
			selectedDate: params.selectedDate,
			dayType: params.dayType,
			remarks: params.remarks,
			radioButtons: [
				{
					label: "Regular",
					value: "Regular",
					color: "teal",
				},
				{
					label: "Casual Leave",
					value: "Casual",
					color: "teal",
				},
				{
					label: "Sick Leave",
					value: "Sick",
					color: "teal",
				},
				{
					label: "Other",
					value: "Other",
					color: "teal",
				},
				{
					label: "Not available",
					value: "NA",
					color: "teal",
				},
			],
		};

		// Update the Radio group based on the value we received
		this.setRadioSelection();

		// Update the title to include the selected date.
		const formatted = Helper.getFormattedDateForDisplay(params.selectedDate);
		this.props.navigation.setOptions({ title: "Time Details (" + formatted + ")" });
	}

	onTimeInChanged = (event, selectedDate) => {
		var time = moment(selectedDate).format("h:mm:ss a");
		this.setState({ showTimeIn: false, showTimeIn: false, timeIn: time });
	};

	onTimeOutChanged = (event, selectedDate) => {
		var time = moment(selectedDate).format("h:mm:ss a");
		this.setState({ showTimeOut: false, showTimeIn: false, timeOut: time });
	};

	onTimeInClicked = () => {
		this.setState({ showTimeIn: true, showTimeOut: false });
	};

	onTimeOutClicked = () => {
		this.setState({ showTimeIn: false, showTimeOut: true });
	};

	onWorkDayTypeChanged = (radioButtons) => {
		this.setState({ radioButtons }, () => {
			this.updateControlState();
		});
	};

	setRadioSelection = () => {
		// IMPORTANT: This call originates from ctor.Since component is not yet finished mounting, no need to call setState,
		// including the const 'radios' variable as it points to 'this.state.radioButtons'.
		const radios = this.state.radioButtons;
		let findIndex = radios.findIndex((e) => e.value == this.state.dayType);
		let radio = radios[findIndex];
		if (radio != null) {
			radio.checked = true;
			radios[findIndex] = radio;
		} else {
			// Set default to 'Not Available
			let findIndex = radios.findIndex((e) => e.value == "NA");
			let radio = radios[findIndex];
			radio.checked = true;
			radios[findIndex] = radio;
		}

		const { showTimeControls, showRemarks } = this.getControlState(false);
		this.state.showTimeControls = showTimeControls;
		this.state.showRemarks = showRemarks;
	};

	updateControlState = () => {
		const { selectedItem, showTimeControls, showRemarks } = this.getControlState(true);
		let dayType = "NA";
		if (selectedItem != null) {
			dayType = selectedItem.value;
		}
		console.log(showTimeControls, showRemarks);
		this.setState({
			showTimeControls: showTimeControls,
			showTimeRemarks: showRemarks,
			dayType: dayType,
		});
	};

	getControlState = (basedOnCheckState) => {
		let selectedItem,
			showRemarks = false,
			showTimeControls = false;
		if (basedOnCheckState) {
			selectedItem = this.state.radioButtons.find((e) => e.checked == true);
		} else {
			selectedItem = this.state.radioButtons.find((e) => e.value == this.state.dayType);
		}

		if (selectedItem != null) {
			showRemarks =
				selectedItem.value == "Casual" || selectedItem.value == "Sick" || selectedItem.value == "Other";
			showTimeControls = selectedItem.value == "Casual" || selectedItem.value == "Regular";
		}
		return { selectedItem: selectedItem, showRemarks: showRemarks, showTimeControls: showTimeControls };
	};

	onSaveClicked = () => {
		const monthYearCode = Helper.getMonthYearCodeFromDate(this.state.selectedDate);
		const workDayItem = {
			date: this.state.selectedDate,
			dayType: this.state.dayType,
			timeIn: this.state.timeIn,
			timeOut: this.state.timeOut,
			remarks: this.state.remarks,
		};
		new Helper().saveTimeDetails(monthYearCode, workDayItem, () => {
			this.props.navigation.navigate("DateSelector");
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<RadioGroup
					color="#484"
					labelStyle={{ fontSize: 14 }}
					radioButtons={this.state.radioButtons}
					onPress={this.onWorkDayTypeChanged}
					style={{ height: 50 }}
				/>
				<View style={{ height: 0 }}>
					{this.state.showTimeIn && (
						<DateTimePicker
							testID="dateTimePicker"
							value={new Date()}
							mode="time"
							textColor="#FFFFFF"
							is24Hour={false}
							display="default"
							onChange={this.onTimeInChanged}
						/>
					)}
					{this.state.showTimeOut && (
						<DateTimePicker
							testID="dateTimePicker"
							value={new Date()}
							mode="time"
							is24Hour={false}
							display="default"
							onChange={this.onTimeOutChanged}
						/>
					)}
				</View>
				{this.state.showTimeControls && (
					<View style={styles.timeInOut}>
						<Grid>
							<Row style={styles.row}>
								<Col>
									<Text style={styles.text}>Time in</Text>
								</Col>
								<Col>
									<Text>{this.state.timeIn}</Text>
								</Col>
								<Col>
									<TouchableOpacity style={styles.timerButton} onPress={this.onTimeInClicked}>
										<FontAwesomeIcon icon={faUserClock} size={30} color="teal" />
									</TouchableOpacity>
								</Col>
							</Row>
							<Row style={styles.row}>
								<Col>
									<Text style={styles.text}>Time out</Text>
								</Col>
								<Col>
									<Text>{this.state.timeOut}</Text>
								</Col>
								<Col>
									<TouchableOpacity style={styles.timerButton} onPress={this.onTimeOutClicked}>
										<FontAwesomeIcon icon={faUserClock} size={30} color="teal" />
									</TouchableOpacity>
								</Col>
							</Row>
						</Grid>
					</View>
				)}
				{this.state.showTimeRemarks && (
					<View style={styles.remarks}>
						<Text style={{ color: "teal" }}>Remarks</Text>
						<TextInput
							multiline={true}
							numberOfLines={6}
							placeholder="Enter remarks here"
							placeholderTextColor="lightgrey"
							onChangeText={(remarks) => this.setState({ remarks })}
							value={this.state.remarks}
							style={styles.textArea}
						/>
					</View>
				)}

				<View style={{ flex: 1 }}>
					<View style={{ flex: 1, justifyContent: "flex-end" }}>
						<TouchableOpacity onPress={this.onSaveClicked} style={styles.button}>
							<Text style={{ color: "white", fontSize: 16 }}>Save</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20,
	},
	title: {
		padding: 20,
	},
	timeInOut: { flex: 1 },
	remarks: {
		padding: 1,
		textAlignVertical: "top",
	},
	textArea: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "teal",
		padding: 5,
		textAlignVertical: "top",
	},
	timerButton: {
		color: "teal",
		borderWidth: 0,
		padding: 10,
		borderRadius: 7,
		alignItems: "center",
		height: 10,
		justifyContent: "center",
	},
	button: {
		backgroundColor: "teal",
		borderWidth: 0,
		borderRadius: 7,
		alignItems: "center",
		height: 60,
		justifyContent: "center",
	},
	row: {
		height: 40,
	},
	text: {
		color: "teal",
		paddingLeft: 10,
	},
});
