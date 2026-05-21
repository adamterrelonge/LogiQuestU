// src/components/AuthButton.js
// A flexible button supporting solid, outline, and text-only (link) variants.

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { loginStyles as styles } from '../styles/LoginStyles';

/**
 * @param {'solid' | 'outline' | 'submit' | 'link'} variant
 * @param {string}   label
 * @param {function} onPress
 * @param {boolean}  loading   - Shows a spinner instead of the label
 * @param {boolean}  disabled
 */
const AuthButton = ({ variant = 'solid', label, onPress, loading = false, disabled = false }) => {
    const containerStyle = {
        submit:  styles.submitBtn,
        solid:   styles.solidBtn,
        outline: styles.outlineBtn,
        link:    null,
    }[variant];

    const textStyle = {
        submit:  styles.submitText,
        solid:   styles.solidBtnText,
        outline: styles.outlineBtnText,
        link:    styles.forgotText,
    }[variant];

    return (
        <TouchableOpacity
            style={containerStyle}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={variant === 'link' ? 1 : 0.85}
        >
            {loading
                ? <ActivityIndicator color="#fff" size="small" />
                : <Text style={textStyle}>{label}</Text>}
        </TouchableOpacity>
    );
};

export default AuthButton;