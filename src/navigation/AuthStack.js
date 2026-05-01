import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" />
            <Stack.Screen name="Register" />
        </Stack.Navigator>
    )
}