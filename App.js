import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import appNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from './src/context/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <appNavigator />
    </AuthProvider>
  );
}
