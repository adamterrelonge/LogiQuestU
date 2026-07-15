// src/pages/main/ProfileScreen.js
// Player profile: avatar, name, streak/league/XP stats, subject mastery bars.
//
// ASSUMPTION: extends 'profiles' with streak, league, total_xp, and
// mastery_languages / mastery_english / mastery_maths (floats 0-1).
// These columns don't exist in the current schema yet — add them via
// migration, or swap fetchProfileStats() below for wherever this data lives.

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../utils/supabase';
import StatCard from '../../components/profile/StatCard';
import MasteryBar from '../../components/profile/MasteryBar';

// Fetches the extended profile fields for the current user
const fetchProfileStats = async (userId) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('nickname, streak, league, total_xp, mastery_languages, mastery_english, mastery_maths')
        .eq('user_id', userId)
        .single();
    return { data, error };
};

const ProfileScreen = ({ navigation }) => {
    const { session } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = session?.user?.id;
        if (!userId) { setLoading(false); return; }

        fetchProfileStats(userId).then(({ data, error }) => {
            if (error) console.error('Profile stats fetch failed:', error.message);
            setStats(data);
            setLoading(false);
        });
    }, [session]);

    return (
        <LinearGradient colors={['#7B2FBE', '#3B82C4', '#56CFD2']} style={styles.flex}>
            <SafeAreaView style={styles.flex}>
                {/* Header: subscription link + bell/settings icons */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
                        <Text style={styles.unlockText}>Unlock LogiQuest</Text>
                    </TouchableOpacity>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                            <Ionicons name="notifications-outline" size={24} color="#111" style={{ marginRight: 16 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <Ionicons name="settings-outline" size={24} color="#111" />
                        </TouchableOpacity>
                    </View>
                </View>

                {loading ? (
                    <ActivityIndicator color="#fff" style={{ marginTop: 40 }} />
                ) : (
                    <ScrollView contentContainerStyle={styles.body}>
                        {/* Avatar + name */}
                        <View style={styles.avatarWrap}>
                            <Ionicons name="person-circle" size={90} color="#111" />
                        </View>
                        <Text style={styles.name}>{stats?.nickname ?? 'Player'}</Text>

                        {/* Streak / League / XP */}
                        <View style={styles.statsRow}>
                            <StatCard icon={<Text style={{ fontSize: 28 }}>🔥</Text>} label="Streak" value={`${stats?.streak ?? 0} Days`} />
                            <StatCard icon={<Ionicons name="trophy-outline" size={26} color="#fff" />} label="League" value={stats?.league ?? 'None'} />
                            <StatCard icon={<Ionicons name="ribbon-outline" size={26} color="#fff" />} label="Total XP" value={stats?.total_xp ?? 0} />
                        </View>

                        {/* Subject mastery */}
                        <View style={styles.masterySection}>
                            <MasteryBar subject="Languages"  progress={stats?.mastery_languages ?? 0} />
                            <MasteryBar subject="English"    progress={stats?.mastery_english ?? 0} />
                            <MasteryBar subject="Mathematics" progress={stats?.mastery_maths ?? 0} />
                        </View>
                    </ScrollView>
                )}
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    flex:         { flex: 1 },
    header:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
    unlockText:   { color: '#111', fontSize: 15, fontWeight: '600' },
    headerIcons:  { flexDirection: 'row' },
    body:         { alignItems: 'center', paddingHorizontal: 24, paddingTop: 20, paddingBottom: 40 },
    avatarWrap:   { marginBottom: 8 },
    name:         { color: '#111', fontSize: 18, fontWeight: '700', marginBottom: 24 },
    statsRow:     { flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginBottom: 32 },
    masterySection: { width: '100%' },
});

export default ProfileScreen; 