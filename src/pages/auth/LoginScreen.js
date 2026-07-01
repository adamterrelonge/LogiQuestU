// src/pages/auth/LoginScreen.js
// Thin orchestrator — layout only. All logic lives in useLogin.

import React from 'react';
import {
    View, KeyboardAvoidingView, Platform, Text,
    TouchableWithoutFeedback, Keyboard, Alert, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import Logo from '../../components/Logo';
import AuthInput  from '../../components/AuthInput';
import AuthButton from '../../components/AuthButton';
import useLogin   from '../../hooks/useLogin';
import { loginStyles as styles } from '../../styles/LoginStyles'

const LoginScreen = ({ navigation }) => {
    const {
        email, setEmail,
        password, setPassword,
        showPassword, toggleShowPassword,
        loading, guestLoading,
        handleLogin, handleGuestLogin,
    } = useLogin();

    return (
        <LinearGradient
            colors={['#7B2FBE', '#3B82C4', '#56CFD2']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={styles.gradient}
        >
            <SafeAreaView style={styles.safe}>
                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.card}>

                        <Logo size="large" />
                            <Text style={styles.title}>Logiquest</Text>

                            <AuthInput
                                icon="mail-outline"
                                placeholder="Email / Username"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />

                            <AuthInput
                                icon="lock-closed-outline"
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                trailingIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                onTrailingPress={toggleShowPassword}
                            />

                            <AuthButton
                                variant="submit"
                                label="Submit"
                                onPress={handleLogin}
                                loading={loading}
                            />

                            <AuthButton
                                variant="link"
                                label="forgot your password?"
                                onPress={() => Alert.alert('Reset Password', 'Feature coming soon.')}
                            />

                            <AuthButton
                                variant="outline"
                                label="Continue as guest"
                                onPress={handleGuestLogin}
                                loading={guestLoading}
                            />

                            <AuthButton
                                variant="solid"
                                label="Register"
                                onPress={() => navigation.navigate('Register')}
                            />

                            {/* Decorative user icon — per mockup */}
                            <View style={styles.userIconWrapper}>
                                <Ionicons
                                    name="person-circle-outline"
                                    size={40}
                                    color="rgba(255,255,255,0.35)"
                                />
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default LoginScreen;