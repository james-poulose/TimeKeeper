import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { WorkDaySummary } from "./WorkDaySummary";

export class DateSelector extends Component {
	state = {
		selectedDate: "None",
	};
	onDayPress = (day) => {
		Alert.alert(day.dateString);
		this.setState({ selectedState: day.dateString });
	};

	onDayLongPress(day) {
		this.props.navigation.navigate("WorkDaySummary");
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Calendar
						onDayPress={this.onDayPress}
						onDayLongPress={this.onDayLongPress}
					/>
				</View>				
				<View>
					<WorkDaySummary
						selectedDate={this.state.selectedDate}
					></WorkDaySummary>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		flex: 1,
		backgroundColor: "#fff",
		padding: 10,
		paddingTop: 20,
	},
});
