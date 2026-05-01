import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

const appNavigator = () => {
    const { session, loading } = useAuth();
    if (loading) {
        return (
        <View>
            <ActivityIndicator />
        </View>
        )
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

export default appNavigator;