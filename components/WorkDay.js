import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { RadioGroup } from "react-native-btr";

export class WorkDay extends Component {
	state = {
		radioButtons: [
			{
				label: "Regular",
				value: "Regular",
				checked: true,
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
			},			{
				label: "Not available",
				value: "NA",
				color: "teal",
			},
		],
	};
	render() {
		return (
			<View style={styles.container}>
				<Text>WorkDay goes here!</Text>
				<View>
					<RadioGroup
						color="#484"
						labelStyle={{ fontSize: 14 }}
						radioButtons={this.state.radioButtons}
						onPress={(radioButtons) =>
							this.setState({ radioButtons })
						}
					/>
				</View>
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
