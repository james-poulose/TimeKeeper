import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
export class WorkDaySummary extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Date: {this.props.selectedDate}</Text>
				<Text>Type: {this.props.selectedDate}</Text>
				<Text>Time in: {this.props.selectedDate}</Text>
				<Text>Time out: {this.props.selectedDate}</Text>
				<Text>Remarks: {this.props.selectedDate}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		padding: 20,
		paddingTop: 20,
	},
});
