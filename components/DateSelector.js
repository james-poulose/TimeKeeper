import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import moment from "moment";
import { WorkDaySummary } from "./WorkDaySummary";
import Helper from "../common/Helper";

export class DateSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			monthData: {},
			selectedDate: moment().toISOString(),
			dayType: "Not set",
			timeIn: "Not set",
			timeOut: "Not set",
			remarks: "Not set",
			markedDates: {},
			currentMarkedDate: {},
			combinedMarkedDate: {},
		};

		this.getDataFromServer();
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
		const code = Helper.getMonthYearCodeFromDate(this.state.selectedDate);
		new Helper().getTimeDetails(code, this.onDataReceived);
	};

	onDataReceived = (result) => {
		const markedDates = {},
			combinedMarkedDate = {};
		for (const property in result) {
			let day = result[property];
			let dateProp = moment(day.date).format("YYYY-MM-DD");
			markedDates[dateProp] = this.getMarkedFormatForDay(day);
			combinedMarkedDate[dateProp] = markedDates[dateProp];
		}

		this.setState({ monthData: result, markedDates: markedDates, combinedMarkedDate: combinedMarkedDate }, () => {
			this.updateSummaryForDate(this.state.selectedDate);
		});
	};

	getMarkedFormatForDay = (day) => {
		// Defaults.
		let selectedColor = "darkgrey";
		let textColor = "black";
		switch (day.dayType) {
			case "Casual":
				selectedColor = "orange";
				textColor = "black";
				break;
			case "Regular":
				selectedColor = "green";
				textColor = "black";
				break;
			case "Sick":
				selectedColor = "red";
				textColor = "black";
				break;
			case "Other":
				selectedColor = "grey";
				textColor = "black";
				break;
		}
		return {
			selected: true,
			marked: true,
			textColor: textColor,
			selectedColor: selectedColor,
		};
	};

	updateSummaryForDate = (dateString) => {
		const momentDate = moment(dateString);
		let selectedDateProp = momentDate.date().toString();
		let selectedDateDetails;
		if (this.state.monthData != null) {
			selectedDateDetails = this.state.monthData[selectedDateProp];
		}
		if (selectedDateDetails == null) {
			selectedDateDetails = {};
		}
		this.setState({
			dayType: selectedDateDetails.dayType,
			timeIn: selectedDateDetails.timeIn,
			timeOut: selectedDateDetails.timeOut,
			remarks: selectedDateDetails.remarks,
		});
	};

	onDayPress = (day) => {
		const momentDate = moment(day.dateString);
		var now = momentDate.toISOString();
		this.updateSummaryForDate(day.dateString);

		let touchedDateProp = momentDate.format("YYYY-MM-DD");
		const touchedMarkedDate = {};
		touchedMarkedDate[touchedDateProp] = {
			selected: true,
			marked: true,
			textColor: "white",
			selectedColor: "teal",
		};

		let combinedMarkedDate = {};
		for (const property in this.state.markedDates) {
			combinedMarkedDate[property] = this.state.markedDates[property];
		}
		combinedMarkedDate[touchedDateProp] = touchedMarkedDate[touchedDateProp];

		this.setState({
			selectedDate: now,
			combinedMarkedDate: combinedMarkedDate,
		});
	};

	onDayLongPress(day) {
		this.goToWorkDayDetails();
	}

	onEditClicked = () => {
		this.goToWorkDayDetails();
	};

	goToWorkDayDetails = () => {
		this.props.navigation.navigate("WorkDayDetails", {
			selectedDate: this.state.selectedDate,
			timeIn: this.state.timeIn,
			timeOut: this.state.timeOut,
			remarks: this.state.remarks,
			dayType: this.state.dayType,
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Calendar
						onDayPress={this.onDayPress}
						onDayLongPress={this.onDayLongPress}
						horizontal={true}
						markedDates={this.state.combinedMarkedDate}
						markingType={"multi-dot"}
					/>
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
						<TouchableOpacity onPress={this.onEditClicked} style={styles.button}>
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
