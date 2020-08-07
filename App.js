import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserClock } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={{ height: 150 }}>
					<Text style={styles.title}>TIMEKEEPER</Text>
				</View>
				<View style={{ height: 250 }}>
					<FontAwesomeIcon icon={faUserClock} size={80} />
				</View>
				<View style={{ height: 50, width: 150 }}>
					<Button
						onPress={() => Alert.alert("Left button pressed")}
						title="Manage time"
						style={styles.button}
					/>
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
		color: "teal",
	},
});
export default App;