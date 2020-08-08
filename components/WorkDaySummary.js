import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

export class WorkDaySummary extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Grid>
					<Row style={styles.row}>
						<Col>
							<Text style={styles.text}>Date:</Text>
						</Col>
						<Col>
							<Text style={styles.text}>
								{this.props.selectedDate}
							</Text>
						</Col>
					</Row>
					<Row style={styles.row}>
						<Col>
							<Text style={styles.text}>Type:</Text>
						</Col>
						<Col>
							<Text style={styles.text}>
								{this.props.dayType}
							</Text>
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
							<Text style={styles.text}>
								{this.props.timeOut}
							</Text>
						</Col>
					</Row>
					<Row style={styles.row}>
						<Col>
							<Text style={styles.text}>Remarks:</Text>
						</Col>
						<Col>
							<Text style={styles.text}>
								{this.props.remarks}
							</Text>
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
	},
	text: {
		color: "teal",
	},
});
