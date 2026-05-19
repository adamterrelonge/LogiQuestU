// src/pages/auth/RegistrationScreen.js
// Registers a new user via Supabase Auth.
// AuthContext's onAuthStateChange handles profile creation automatically.

import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet, KeyboardAvoidingView, Platform,
    TouchableWithoutFeedback, Keyboard, ActivityIndicator, Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabase } from '../../utils/supabase';

const RegisterScreen = ({ navigation }) => {
    const [name,         setName]         = useState('');
    const [email,        setEmail]        = useState('');
    const [password,     setPassword]     = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading,      setLoading]      = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Missing Fields', 'Please fill in all fields.');
            return;
        }

        setLoading(true);

        // Sign up with Supabase Auth; pass full name as user metadata
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: name } },
        });

        setLoading(false);

        if (error) {
            Alert.alert('Registration Failed', error.message);
        } else {
            Alert.alert(
                'Account Created!',
                'Check your email to confirm your account, then log in.',
                [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
            );
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Register to get started</Text>

                    <TextInput style={styles.input} placeholder="Full Name"
                        placeholderTextColor="#999" value={name} onChangeText={setName} />

                    <TextInput style={styles.input} placeholder="Email"
                        placeholderTextColor="#999" value={email} onChangeText={setEmail}
                        keyboardType="email-address" autoCapitalize="none" />

                    <View style={styles.passwordContainer}>
                        <TextInput style={styles.passwordInput} placeholder="Password"
                            placeholderTextColor="#999" value={password}
                            onChangeText={setPassword} secureTextEntry={!showPassword} />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                        {loading
                            ? <ActivityIndicator color="#fff" />
                            : <Text style={styles.buttonText}>Register</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.footerText}>
                            Already have an account? <Text style={styles.link}>Login</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    flex:              { flex: 1 },
    container:         { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
    title:             { fontSize: 34, fontWeight: 'bold', color: '#111', marginBottom: 8 },
    subtitle:          { fontSize: 16, color: '#666', marginBottom: 35 },
    input:             { height: 55, borderWidth: 1, borderColor: '#ddd', borderRadius: 14, paddingHorizontal: 16, marginBottom: 18, fontSize: 16, backgroundColor: '#FAFAFA' },
    passwordContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 14, paddingHorizontal: 16, backgroundColor: '#FAFAFA', marginBottom: 20 },
    passwordInput:     { flex: 1, height: 55, fontSize: 16 },
    button:            { backgroundColor: '#28A745', height: 55, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    buttonText:        { color: '#fff', fontSize: 18, fontWeight: '600' },
    footerText:        { marginTop: 25, textAlign: 'center', color: '#666', fontSize: 15 },
    link:              { color: '#28A745', fontWeight: 'bold' },
});