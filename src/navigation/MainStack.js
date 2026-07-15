import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Dashboard from "../pages/main/Dashboard";
import GameOverScreen from "../pages/quiz/GameOverScreen";
import ResultsScreen from "../pages/quiz/ResultsScreen";
import QuizRouter from "../pages/quiz/QuizRouter";
import GradeSelectScreen from "../pages/quiz/GradeSelectScreen";
import LeaderboardScreen from "../pages/main/LeaderboardScreen";
import SettingsScreen from "../pages/main/SettingsScreen";
import ProfileScreen from "../pages/main/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Quiz" component={QuizRouter} />
            <Stack.Screen name="GameOver" component={GameOverScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Results" component={ResultsScreen} options={{ headerShown: false }} /> 
            <Stack.Screen name="GradeSelect" component={GradeSelectScreen}/>
            <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
}  