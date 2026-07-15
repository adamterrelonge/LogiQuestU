// src/components/profile/StatCard.js
// One of the three top stats: Streak / League / Total XP.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatCard = ({ icon, label, value }) => (
    <View style={styles.card}>
        {icon}
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    card:  { alignItems: 'center', flex: 1 },
    label: { color: '#fff', fontSize: 13, marginTop: 6, fontWeight: '600' },
    value: { color: '#eee', fontSize: 12, marginTop: 2 },
});

export default StatCard; 