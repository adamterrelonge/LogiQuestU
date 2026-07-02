import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Dashboard from "../pages/main/Dashboard";
import MathQuizScreen from "../pages/quiz/MathQuizScreen";
import GameOverScreen from "../pages/quiz/GameOverScreen";
import ResultsScreen from "../pages/quiz/ResultsScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Quiz" component={MathQuizScreen} />
            <Stack.Screen name="GameOver" component={GameOverScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Results" component={ResultsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
} 