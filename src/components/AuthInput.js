// src/components/AuthInput.js
// A styled text input with a leading icon and an optional trailing action.

import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { loginStyles as styles } from '../styles/LoginStyles';

/**
 * @param {string}        icon          - Ionicons name for the leading icon
 * @param {string}        placeholder
 * @param {string}        value
 * @param {function}      onChangeText
 * @param {boolean}       secureTextEntry
 * @param {string}        keyboardType
 * @param {string}        autoCapitalize
 * @param {string}        trailingIcon  - Ionicons name for an optional trailing icon
 * @param {function}      onTrailingPress
 */
const AuthInput = ({
    icon,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    trailingIcon,
    onTrailingPress,
}) => (
    <View style={styles.inputRow}>
        <Ionicons name={icon} size={18} color="#ccc" style={styles.inputIcon} />
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#bbb"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
        />
        {trailingIcon && (
            <TouchableOpacity onPress={onTrailingPress}>
                <Ionicons name={trailingIcon} size={20} color="#ccc" />
            </TouchableOpacity>
        )}
    </View>
);

export default AuthInput;