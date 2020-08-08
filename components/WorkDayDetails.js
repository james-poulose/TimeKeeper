import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { RadioGroup } from "react-native-btr";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserClock } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Grid } from "react-native-easy-grid";

export class WorkDayDetails extends Component {
	state = {
		remarks: "",
		showTimeIn: false,
		showTimeOut: false,
		timeIn: "12:00 PM",
		timeOut: "12:30 PM",
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
				checked: true,
				color: "teal",
			},
		],
	};

	onTimeInChanged() {}
	onTimeInClicked = () => {
		this.setState({ showTimeIn: true });
	};

	onTimeOutClicked = () => {
		this.setState({ showTimeOut: true });
	};

	onWorkDayTypeChanged = (radioButtons) => {
		this.setState({ radioButtons });

		let selectedItem = this.state.radioButtons.find((e) => e.checked == true);
		this.setState({ remarks: selectedItem.value });
		// switch(selectedItem.value){
		// 	case "Casual":
		// 	case "Regular":this.setState({remarks: selectedItem.value});
		// }
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.title}>
					<Text style={{ fontSize: 18 }}>Modify Details</Text>
				</View>
				<RadioGroup
					color="#484"
					labelStyle={{ fontSize: 14 }}
					radioButtons={this.state.radioButtons}
					onPress={this.onWorkDayTypeChanged}
				/>
				<View>
					{this.state.showTimeIn && (
						<DateTimePicker
							testID="dateTimePicker"
							value={new Date()}
							mode="time"
							is24Hour={false}
							display="default"
							onChange={this.onTimeInChanged}
						/>
					)}
				</View>
				<View style={{ height: 100, marginTop: 20 }}>
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

				<View style={{ flex: 1 }}>
					<View style={{ flex: 1 }}>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate("WorkDayDetails")}
							style={styles.button}
						>
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
		backgroundColor: "#fff",
		padding: 20,
	},
	title: {
		padding: 20,
	},
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
		padding: 10,
		borderRadius: 7,
		alignItems: "center",
		width: "100%",
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
