import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" />
        </Stack.Navigator>
    )
}