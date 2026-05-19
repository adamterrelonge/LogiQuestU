// src/pages/auth/LoginScreen.js
// Matches NEA design mockup: centred logo, gradient bg, email/password,
// submit, forgot password, continue as guest, register redirect.

import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback,
    Keyboard, ActivityIndicator, Alert, SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabase } from '../../utils/supabase';

// ── Logo / Brand block ─────────────────────────────────────────────
const LogoBrand = () => (
    <View style={styles.brandBlock}>
        {/* Circuit-style icon box */}
        <View style={styles.iconOuter}>
            <View style={styles.iconInner}>
                <Text style={styles.iconGlyph}>⬡</Text>
            </View>
            {/* Decorative circuit pins on each edge */}
            {[0, 1, 2, 3].map(i => (
                <View key={i} style={[styles.pin, styles[`pin${i}`]]} />
            ))}
        </View>
        <Text style={styles.brandName}>LogiQuest</Text>
    </View>
);

// ── Reusable input row ─────────────────────────────────────────────
const InputRow = ({ icon, ...props }) => (
    <View style={styles.inputRow}>
        <Ionicons name={icon} size={18} color="#ccc" style={styles.inputIcon} />
        <TextInput style={styles.input} placeholderTextColor="#bbb" {...props} />
    </View>
);

// ── Main Screen ────────────────────────────────────────────────────
const LoginScreen = ({ navigation }) => {
    const [email,        setEmail]        = useState('');
    const [password,     setPassword]     = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading,      setLoading]      = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Missing Fields', 'Please enter your email and password.');
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) Alert.alert('Login Failed', error.message);
        // Success → AuthContext detects the new session → routes to MainStack
    };

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

                            {/* Centred logo + brand name */}
                            <LogoBrand />

                            {/* Email / Username input */}
                            <InputRow
                                icon="mail-outline"
                                placeholder="Email / Username"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            {/* Password input with show/hide toggle */}
                            <View style={styles.inputRow}>
                                <Ionicons name="lock-closed-outline" size={18} color="#ccc" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor="#bbb"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(p => !p)}>
                                    <Ionicons
                                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                        size={20} color="#ccc"
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Submit button — validates and calls Supabase */}
                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={handleLogin}
                                disabled={loading}
                                activeOpacity={0.85}
                            >
                                {loading
                                    ? <ActivityIndicator color="#fff" />
                                    : <Text style={styles.submitText}>Submit</Text>}
                            </TouchableOpacity>

                            {/* Forgot password link */}
                            <TouchableOpacity
                                onPress={() => Alert.alert('Reset Password', 'Feature coming soon.')}
                            >
                                <Text style={styles.forgotText}>forgot your password?</Text>
                            </TouchableOpacity>

                            {/* Continue as guest */}
                            <TouchableOpacity
                                style={styles.outlineBtn}
                                onPress={() => Alert.alert('Guest Mode', 'Coming soon.')}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.outlineBtnText}>Continue as guest</Text>
                            </TouchableOpacity>

                            {/* Register redirect */}
                            <TouchableOpacity
                                style={styles.solidBtn}
                                onPress={() => navigation.navigate('Register')}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.solidBtnText}>Register</Text>
                            </TouchableOpacity>

                            {/* User icon — bottom decoration as per mockup */}
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

// ── Styles ─────────────────────────────────────────────────────────
const BTN_PURPLE = '#8B3FCC';

const styles = StyleSheet.create({
    gradient: { flex: 1 },
    safe:     { flex: 1 },
    flex:     { flex: 1, justifyContent: 'center', alignItems: 'center' },

    // Frosted-glass card — matches the rectangle in the mockup
    card: {
        width: '82%',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 24,
        paddingVertical: 32,
        alignItems: 'center',
    },

    // ── Brand / logo ───────────────────────────────────────────────
    brandBlock: { alignItems: 'center', marginBottom: 22 },
    iconOuter: {
        width: 62, height: 62,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        position: 'relative',
    },
    iconInner:  { justifyContent: 'center', alignItems: 'center' },
    iconGlyph:  { fontSize: 30, color: '#fff' },

    // Small dots at each edge of the icon — circuit-board feel
    pin:  { position: 'absolute', width: 5, height: 5, borderRadius: 3, backgroundColor: '#fff' },
    pin0: { top: -4,    left: '35%' },
    pin1: { top: -4,    right: '35%' },
    pin2: { bottom: -4, left: '35%' },
    pin3: { bottom: -4, right: '35%' },

    brandName: {
        fontSize: 26, fontWeight: '800',
        color: '#fff', letterSpacing: 0.5,
    },

    // ── Inputs ─────────────────────────────────────────────────────
    inputRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderRadius: 10,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 12,
        marginBottom: 12,
        width: '100%', height: 46,
    },
    inputIcon: { marginRight: 8 },
    input: {
        flex: 1, color: '#fff',
        fontSize: 14, height: '100%',
    },

    // ── Buttons ────────────────────────────────────────────────────
    submitBtn: {
        backgroundColor: BTN_PURPLE,
        borderRadius: 10, height: 44,
        width: '55%',
        justifyContent: 'center', alignItems: 'center',
        marginTop: 4, marginBottom: 10,
        shadowColor: '#000', shadowOpacity: 0.3,
        shadowRadius: 6, elevation: 4,
    },
    submitText: { color: '#fff', fontWeight: '700', fontSize: 15 },

    forgotText: {
        color: 'rgba(255,255,255,0.75)',
        fontSize: 12, marginBottom: 14,
    },

    outlineBtn: {
        borderRadius: 10, height: 42,
        width: '80%',
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.5)',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    outlineBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },

    solidBtn: {
        backgroundColor: BTN_PURPLE,
        borderRadius: 10, height: 42,
        width: '80%',
        justifyContent: 'center', alignItems: 'center',
        shadowColor: '#000', shadowOpacity: 0.2,
        shadowRadius: 4, elevation: 3,
    },
    solidBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },

    // ── User icon ──────────────────────────────────────────────────
    userIconWrapper: { marginTop: 18 },
});