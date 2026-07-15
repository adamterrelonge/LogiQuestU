// src/components/leaderboard/LeaderboardRow.js
// One row: medal, avatar circle, nickname, score.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MEDALS = { 1: '🥇', 2: '🥈', 3: '🥉' };

const LeaderboardRow = ({ rank, nickname, score }) => (
    <View style={styles.row}>
        <Text style={styles.medal}>{MEDALS[rank] ?? `#${rank}`}</Text>

        <View style={styles.avatar}>
            <Ionicons name="person" size={18} color="#fff" />
        </View>

        <View style={styles.info}>
            <Text style={styles.nickname}>{nickname}</Text>
            <Text style={styles.score}>Score: {score.toLocaleString()}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    row:      { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
    medal:    { fontSize: 26, width: 34, textAlign: 'center' },
    avatar:   { width: 32, height: 32, borderRadius: 16, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 },
    info:     { flex: 1 },
    nickname: { color: '#fff', fontWeight: '600', fontSize: 15 },
    score:    { color: '#eee', fontSize: 13, marginTop: 2 },
});

export default LeaderboardRow; 