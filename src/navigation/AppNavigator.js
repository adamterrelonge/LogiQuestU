import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useAuth } from "../context/AuthContext";

const AppNavigator = () => {
    const { session, loading } = useAuth();

    if (loading) {
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {session && session.user ? (
                <MainStack />
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    );
};

export default AppNavigator; 