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
				<Stack.Navigator
					initialRouteName="Home"
					screenOptions={{ headerShown: false }}
				>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen
						name="DateSelector"
						component={DateSelector}
					/>
					<Stack.Screen
						name="WorkDayDetails"
						component={WorkDayDetails}
					/>					
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
