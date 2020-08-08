import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

export class WorkDaySummary extends Component {
	state = {
		remarks: "",
	};
	render() {
		return (
			<View style={styles.container}>
				<Grid>
					<Row style={styles.row}>
						<Col>
							<Text style={styles.text}>Date:</Text>
						</Col>
						<Col>
							<Text style={styles.text}>{this.props.selectedDate}</Text>
						</Col>
					</Row>
					<Row style={styles.row}>
						<Col>
							<Text style={styles.text}>Type:</Text>
						</Col>
						<Col>
							<Text style={styles.text}>{this.props.dayType}</Text>
						</Col>
					</Row>
					<Row style={styles.row}>
						<Col>
							<Text style={styles.text}>Time in:</Text>
						</Col>
						<Col>
							<Text style={styles.text}>{this.props.timeIn}</Text>
						</Col>
					</Row>
					<Row style={styles.row}>
						<Col>
							<Text style={styles.text}>Time out:</Text>
						</Col>
						<Col>
							<Text style={styles.text}>{this.props.timeOut}</Text>
						</Col>
					</Row>
					<Row style={styles.row}>
						<Col>
							<Text style={styles.text}>Remarks:</Text>
						</Col>
						<Col>
							<Text style={styles.text}>{this.props.remarks}</Text>
						</Col>
					</Row>
				</Grid>
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
	row: {
		height: 30,
		borderBottomWidth: 1,
		borderColor: "lightgrey",
		marginTop: 15
	},
	text: {
		color: "teal",
		fontSize: 16,
	},
	remarks: {
		padding: 1,
		textAlignVertical: "top",
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
});
