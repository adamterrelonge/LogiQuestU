import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Dashboard from "../pages/main/Dashboard";
import MathQuizScreen from "../pages/quiz/MathQuizScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard}/>
            <Stack.Screen name="Maths-Quiz" component={MathQuizScreen}/>
        </Stack.Navigator>
    )
}