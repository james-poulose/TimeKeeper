import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { WorkDay } from "./WorkDay";

export class DateSelector extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View>
					<Calendar>
						onDayPress=
						{(day) => {
							Alert.alert(day.dateString);
						}}
						onDayLongPress=
						{(day) => {
							Alert.alert(day.dateString);
						}}
					</Calendar>
				</View>
				<View>
					<WorkDay></WorkDay>
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
