import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { WorkDaySummary } from "./WorkDaySummary";

export class DateSelector extends Component {
	state = {
		selectedDate: "None",
		dayType: "None",
		timeIn: "None",
		timeOut: "None",
		remarks: "None",
	};
	onDayPress = (day) => {
		this.setState({
			selectedDate: day.dateString,
			dayType: "None",
			timeIn: "in",
			timeOut: "None",
			remarks: "None",
		});
	};

	onDayLongPress(day) {
		this.props.navigation.navigate("WorkDaySummary");
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Calendar onDayPress={this.onDayPress} onDayLongPress={this.onDayLongPress} />
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
						<TouchableOpacity style={styles.button}>
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
