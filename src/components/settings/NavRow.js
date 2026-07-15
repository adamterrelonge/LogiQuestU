// src/components/settings/NavRow.js
// A settings row that navigates elsewhere on press (chevron indicates this).
// destructive=true renders the label in red (e.g. Delete Account).

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NavRow = ({ label, onPress, destructive = false }) => (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
        <Text style={[styles.label, destructive && styles.destructive]}>{label}</Text>
        <Ionicons name="chevron-forward" size={20} color={destructive ? '#FF6B6B' : '#111'} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    row:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14 },
    label:       { color: '#fff', fontSize: 16 },
    destructive: { color: '#FF6B6B', fontWeight: '600' },
});

export default NavRow; 