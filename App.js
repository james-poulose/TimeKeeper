import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React, { Component } from "react";
import { Home } from "./components/Home";
import { DateSelector } from "./components/DateSelector";
import { WorkDayDetails } from "./components/WorkDayDetails";

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default class App extends Component {
	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
					<Stack.Screen
						name="DateSelector"
						component={DateSelector}
						options={{ title: "Choose Date", headerTintColor: "teal" }}
					/>
					<Stack.Screen
						name="WorkDayDetails"
						component={WorkDayDetails}
						options={{ title: "Time Details", headerTintColor: "teal" }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
