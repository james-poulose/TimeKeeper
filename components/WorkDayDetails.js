import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { RadioGroup } from "react-native-btr";

export class WorkDayDetails extends Component {
	state = {
		remarks: "",
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
					onPress={(radioButtons) => this.setState({ radioButtons })}
				/>
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
});
