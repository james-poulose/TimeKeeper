import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { WorkDaySummary } from "./WorkDaySummary";
import moment from "moment";

export class DateSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDate: "None",
			dayType: "NA",
			timeIn: "NA",
			timeOut: "NA",
			remarks: "NA",
		};		
	}

	componentDidMount(){
		// this.getDataFromServer();
	}

	getDataFromServer = () => {
		// fetch("http://your-hr-api/").then((result) => {
		// 	let data = [
		// 		{ date: "", timeIn: "" },
		// 		{ date: "", timeIn: "" },
		// 		{ date: "", timeIn: "" },
		// 	];
		// });

		// return data from local storage		
	};

	onDayPress = (day) => {
		var now = moment(day.dateString).format("DD-MMM-YYYY");
		this.setState({
			selectedDate: now,
			// dayType: "NA",
			// timeIn: "NA",
			// timeOut: "NA",
			// remarks: "NA",
		});
	};

	onDayLongPress(day) {
		this.props.navigation.navigate("WorkDayDetails");
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Calendar onDayPress={this.onDayPress} onDayLongPress={this.onDayLongPress} horizontal={true} />
				</View>
				<View>
					<WorkDaySummary
						selectedDate={this.state.selectedDate}
						dayType={this.state.dayType}
						timeIn={this.state.timeIn}
						timeOut={this.state.timeOut}
						remarks={this.state.remarks}
					></WorkDaySummary>
				</View>
				<View style={{ flex: 1 }}>
					<View style={{ flex: 1, justifyContent: "flex-end" }}>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate("WorkDayDetails")}
							style={styles.button}
						>
							<Text style={{ color: "white", fontSize: 16 }}>Edit</Text>
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
		padding: 10,
		paddingTop: 20,
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
	bottomView: {
		flex: 1,
		justifyContent: "flex-end",
		borderWidth: 0,
		position: "absolute",
		bottom: 0,
	},
	row: {
		height: 40,
	},
});
