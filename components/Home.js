import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserClock } from "@fortawesome/free-solid-svg-icons";

export class Home extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={{ height: 150 }}>
					<Text style={styles.title}>TIMEKEEPER</Text>
				</View>
				<View style={{ height: 250 }}>
					<FontAwesomeIcon
						icon={faUserClock}
						size={80}
						color="teal"
					/>
				</View>
				<View style={{ height: 50 }}>
					<TouchableOpacity
						onPress={() => Alert.alert("Left button pressed")}
						title="Button"
						style={styles.button}
					>
						<Text style={{ color: "white" }}>Manage Time</Text>
					</TouchableOpacity>
				</View>

				<StatusBar style="auto" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		color: "teal",
		fontSize: 24,
	},
	button: {
		backgroundColor: "teal",
		color: "white",
		borderWidth: 1,
		padding: 10,
		borderRadius: 7,
		width: 150,
		alignItems: "center",
	},
});
