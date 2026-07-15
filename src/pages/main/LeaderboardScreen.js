// src/pages/main/LeaderboardScreen.js
// Top-3 leaderboard screen, matches the login gradient theme.

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchLeaderboard } from '../../utils/supabase';
import LeaderboardRow from '../../components/leaderboard/LeaderboardRow';

const LeaderboardScreen = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const { leaderboard: data, error } = await fetchLeaderboard(3);
            if (error) console.error('Leaderboard fetch failed:', error.message);
            setLeaderboard(data);
            setLoading(false);
        };
        load();
    }, []);

    return (
        <LinearGradient colors={['#7B2FBE', '#3B82C4', '#56CFD2']} style={styles.flex}>
            <SafeAreaView style={styles.flex}>
                {/* Trophy + game name, mirrors LogoBrand pattern */}
                <View style={styles.header}>
                    <Ionicons name="trophy" size={54} color="#FFD700" />
                    <Text style={styles.title}>LogiQuest</Text>
                </View>

                {/* Leaderboard card */}
                <View style={styles.card}>
                    <View style={styles.banner}>
                        <Text style={styles.bannerText}>Leaderboard</Text>
                    </View>

                    {loading ? (
                        <ActivityIndicator color="#fff" style={{ marginTop: 20 }} />
                    ) : leaderboard.length === 0 ? (
                        <Text style={styles.empty}>No scores yet — be the first!</Text>
                    ) : (
                        leaderboard.map((entry, index) => (
                            <LeaderboardRow
                                key={entry.userId}
                                rank={index + 1}
                                nickname={entry.nickname}
                                score={entry.score}
                            />
                        ))
                    )}
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    flex:   { flex: 1 },
    header: { alignItems: 'center', marginTop: 30, marginBottom: 20 },
    title:  { fontSize: 26, fontWeight: '700', color: '#111', marginTop: 6 },
    card:   { backgroundColor: 'rgba(60,20,110,0.55)', marginHorizontal: 24, borderRadius: 20, padding: 20 },
    banner: { backgroundColor: '#D64545', alignSelf: 'center', paddingHorizontal: 24, paddingVertical: 6, borderRadius: 6, marginTop: -34, marginBottom: 12 },
    bannerText: { color: '#fff', fontWeight: '700' },
    empty:  { color: '#eee', textAlign: 'center', marginTop: 12 },
});

export default LeaderboardScreen; 