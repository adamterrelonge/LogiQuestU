// src/hooks/useLogin.js
// Encapsulates all state and auth logic for the login screen.

import { useState } from 'react';
import { Alert } from 'react-native';
import { supabase, signInAsGuest } from '../utils/supabase';

const useLogin = () => {
    const [email,        setEmail]        = useState('');
    const [password,     setPassword]     = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading,      setLoading]      = useState(false);
    const [guestLoading, setGuestLoading] = useState(false);

    // Regular email/password login
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Missing Fields', 'Please enter your email and password.');
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) Alert.alert('Login Failed', error.message);
        // On success → AuthContext detects session → routes to MainStack
    };

    // Anonymous guest login — no credentials required
    const handleGuestLogin = async () => {
        setGuestLoading(true);
        const { error } = await signInAsGuest();
        setGuestLoading(false);

        if (error) {
            Alert.alert(
                'Guest Login Failed',
                error.message.includes('not enabled')
                    ? 'Guest access is not enabled yet. Please register for an account.'
                    : error.message,
            );
        }
        // On success → AuthContext sets isGuest=true → routes to MainStack
    };

    const toggleShowPassword = () => setShowPassword(p => !p);

    return {
        email, setEmail,
        password, setPassword,
        showPassword, toggleShowPassword,
        loading, guestLoading,
        handleLogin, handleGuestLogin,
    };
};

export default useLogin;