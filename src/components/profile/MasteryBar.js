// src/components/profile/MasteryBar.js
// A subject row: label left, level label right, filled progress bar below.
// progress is 0-1. LEVELS maps progress bands to a display label.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LEVELS = [
    { max: 0.34, label: 'Beginner' },
    { max: 0.74, label: 'Intermediate' },
    { max: 1.0,  label: 'Advanced' },
];

const levelLabel = (progress) => (LEVELS.find((l) => progress <= l.max) ?? LEVELS[2]).label;

const MasteryBar = ({ subject, progress }) => (
    <View style={styles.container}>
        <View style={styles.labelRow}>
            <Text style={styles.subject}>{subject}</Text>
            <Text style={styles.level}>{levelLabel(progress)}</Text>
        </View>
        <View style={styles.track}>
            <View style={[styles.fill, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { marginBottom: 16 },
    labelRow:  { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    subject:   { color: '#fff', fontSize: 13, fontWeight: '600' },
    level:     { color: '#eee', fontSize: 12 },
    track:     { height: 10, borderRadius: 5, backgroundColor: 'rgba(255,255,255,0.25)', overflow: 'hidden' },
    fill:      { height: '100%', backgroundColor: '#2FD1C5', borderRadius: 5 },
});

export default MasteryBar; 