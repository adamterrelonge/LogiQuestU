// src/components/settings/ToggleRow.js
// A settings row with a label and an on/off switch.

import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const ToggleRow = ({ label, value, onValueChange }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: '#ffffff55', true: '#6C4DF0' }}
            thumbColor="#fff"
        />
    </View>
);

const styles = StyleSheet.create({
    row:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
    label: { color: '#fff', fontSize: 16 },
});

export default ToggleRow; 