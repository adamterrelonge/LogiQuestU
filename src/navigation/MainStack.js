import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Dashboard from "../pages/main/Dashboard";

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard}/>
        </Stack.Navigator>
    )
}