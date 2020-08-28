import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, Button } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserClock } from "@fortawesome/free-solid-svg-icons";
import Helper from "../common/Helper";

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			email: "user@domain.com",
			password: "password",
		};

		this.props.navigation.addListener("focus", () => {
			this.checkSecurity();
		});
	}

	componentDidMount() {
		this.checkSecurity();
	}

	checkSecurity = () => {
		Helper.getFromStorage("isLoggedIn", (result) => {
			var isLoggedIn = JSON.parse(result);
			if (isLoggedIn === "1") {
				console.log("Skipping login..");
				this.props.navigation.navigate("DateSelector");
			}
		});
	};

	onClearStorage = () => {
		Helper.clearLocalStorage();
	};

	onLogin = () => {
		if (this.state.email == "user@domain.com" && this.state.password == "password") {
			new Helper().putInStorage("isLoggedIn", "1", () => {
				this.props.navigation.navigate("DateSelector");
			});
		}
	};

	handleEmail = (text) => {
		this.setState({ email: text });
	};
	handlePassword = (text) => {
		this.setState({ password: text });
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={{ height: 150 }}>
					<Text style={styles.title}>TIMEKEEPER</Text>
				</View>
				<View style={{ height: 100 }}>
					<FontAwesomeIcon icon={faUserClock} size={80} color="teal" />
				</View>
				<View
					style={{
						height: 40,
						width: 250,
						borderWidth: 1,
						borderRadius: 3,
						borderColor: "teal",
						padding: 5,
						margin: 3,
					}}
				>
					<TextInput
						value={this.state.email}
						placeholder="User name"
						onChangeText={this.handleEmail}
						style={{ color: "teal" }}
					></TextInput>
				</View>
				<View
					style={{
						height: 40,
						width: 250,
						borderWidth: 1,
						borderRadius: 3,
						borderColor: "teal",
						padding: 5,
						margin: 3,
					}}
				>
					<TextInput
						value={this.state.password}
						placeholder="Password"
						secureTextEntry={true}
						onChangeText={this.handlePassword}
						style={{ color: "teal" }}
					></TextInput>
				</View>
				<View style={{ height: 150 }} />
				<View style={{ height: 50 }}>
					<TouchableOpacity onPress={this.onLogin} title="Button" style={styles.button}>
						<Text style={{ color: "white" }}>Login</Text>
					</TouchableOpacity>
				</View>
				<Text style={styles.version}>v{Constants.manifest.version}</Text>
				{/* <Button title="Clear Storage" onPress={this.onClearStorage}></Button> */}
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
	version: { color: "lightgrey" },
});
