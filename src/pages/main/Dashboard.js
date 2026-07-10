// src/pages/main/Dashboard.js
// Shows a guest banner + locks score/streak features when isGuest=true.

import React from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    ScrollView, SafeAreaView, Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../context/AuthContext';

const SUBJECTS = [
    { id: 'science', label: 'Science', emoji: '🔬', color: '#00C9A7', bg: '#E6FBF7' },
    { id: 'math',    label: 'Maths',   emoji: '📐', color: '#FF6B6B', bg: '#FFF0F0' },
    { id: 'english', label: 'English', emoji: '📖', color: '#845EF7', bg: '#F3EEFF' },
];

// ── Guest banner ───────────────────────────────────────────────────
const GuestBanner = ({ onSignUp }) => (
    <TouchableOpacity style={styles.guestBanner} onPress={onSignUp} activeOpacity={0.85}>
        <Ionicons name="information-circle-outline" size={20} color="#92400E" />
        <Text style={styles.guestBannerText}>
            You're browsing as a guest.{' '}
            <Text style={styles.guestBannerLink}>Sign up to save scores →</Text>
        </Text>
    </TouchableOpacity>
);

// ── Stat pill — locked for guests ─────────────────────────────────
const StatPill = ({ label, value, locked }) => (
    <View style={styles.statPill}>
        {locked
            ? <Ionicons name="lock-closed" size={18} color="#ccc" />
            : <Text style={styles.statValue}>{value}</Text>}
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

// ── Subject card ───────────────────────────────────────────────────
const SubjectCard = ({ subject, onPress }) => (
    <TouchableOpacity
        style={[styles.card, { backgroundColor: subject.bg }]}
        onPress={() => onPress(subject.id)}
        activeOpacity={0.75}
    >
        <Text style={styles.cardEmoji}>{subject.emoji}</Text>
        <Text style={[styles.cardLabel, { color: subject.color }]}>{subject.label}</Text>
        <View style={[styles.cardAccent, { backgroundColor: subject.color }]} />
    </TouchableOpacity>
);

// ── Main Dashboard ─────────────────────────────────────────────────
const Dashboard = ({ navigation }) => {
    const { signOut, isGuest } = useAuth();

    // src/pages/main/Dashboard.js (inside the Dashboard component)

    const handleSubjectPress = (subjectId) => {
        if (isGuest) {
            Alert.alert(
                'Guest Mode',
                "You can play, but your score won't be saved. Register to track your progress!",
                [
                    { text: 'Register', onPress: () => navigation.navigate('Register') },
                    { text: 'Play anyway', onPress: () => navigateToSubject(subjectId) },
                ]
            );
            return;
        }
    
        navigateToSubject(subjectId);
    };
    
    // All subjects now start with a grade-selection step
    const navigateToSubject = (subjectId) => {
        navigation.navigate('GradeSelect', { subject: subjectId }); 
    }; 

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.scroll}>

                {/* Amber warning banner — guests only */}
                {isGuest && (
                    <GuestBanner onSignUp={() => navigation.navigate('Register')} />
                )}

                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>
                            {isGuest ? 'Hello, Guest 👋' : 'Welcome back 👋'}
                        </Text>
                        <Text style={styles.appName}>LogiQuest</Text>
                    </View>
                    <TouchableOpacity style={styles.signOutBtn} onPress={signOut}>
                        <Text style={styles.signOutText}>{isGuest ? 'Exit' : 'Sign Out'}</Text>
                    </TouchableOpacity>
                </View>

                {/* Stats — padlocked for guests */}
                <View style={styles.statsRow}>
                    <StatPill label="Streak"    value="3🔥" locked={isGuest} />
                    <StatPill label="Best Score" value="95%" locked={isGuest} />
                    <StatPill label="Quizzes"    value="12"  locked={isGuest} />
                </View>

                {/* Subject selector */}
                <Text style={styles.sectionTitle}>Choose a Subject</Text>
                <View style={styles.cardGrid}>
                    {SUBJECTS.map(s => (
                        <SubjectCard key={s.id} subject={s} onPress={handleSubjectPress} />
                    ))}
                </View>

                {/* Daily challenge */}
                <TouchableOpacity style={styles.challengeBanner} activeOpacity={0.8}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.challengeTitle}>⚡ Daily Challenge</Text>
                        <Text style={styles.challengeSub}>Mixed topics · 10 questions</Text>
                    </View>
                    <View style={styles.challengeArrow}>
                        <Text style={styles.challengeArrowText}>→</Text>
                    </View>
                </TouchableOpacity>

                {/* Register CTA — guests only */}
                {isGuest && (
                    <TouchableOpacity
                        style={styles.ctaBtn}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.ctaText}>
                            🎯 Create a free account to save your progress
                        </Text>
                    </TouchableOpacity>
                )}

            </ScrollView>
        </SafeAreaView>
    );
};

export default Dashboard;

// ── Styles ─────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    safe:   { flex: 1, backgroundColor: '#F7F8FC' },
    scroll: { padding: 20, paddingBottom: 40 },

    // Guest banner
    guestBanner: {
        flexDirection: 'row', alignItems: 'center', gap: 8,
        backgroundColor: '#FEF3C7', borderRadius: 12,
        padding: 12, marginBottom: 16,
        borderWidth: 1, borderColor: '#FCD34D',
    },
    guestBannerText: { flex: 1, fontSize: 13, color: '#92400E' },
    guestBannerLink: { fontWeight: '700', textDecorationLine: 'underline' },

    // Header
    header:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
    greeting:    { fontSize: 14, color: '#888', fontWeight: '500' },
    appName:     { fontSize: 28, fontWeight: '800', color: '#1A1A2E', letterSpacing: -0.5 },
    signOutBtn:  { backgroundColor: '#FFE8E8', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
    signOutText: { color: '#FF6B6B', fontWeight: '600', fontSize: 13 },

    // Stats
    statsRow:  { flexDirection: 'row', gap: 10, marginBottom: 28 },
    statPill:  { flex: 1, backgroundColor: '#fff', borderRadius: 16, paddingVertical: 14, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
    statValue: { fontSize: 18, fontWeight: '800', color: '#1A1A2E' },
    statLabel: { fontSize: 11, color: '#999', marginTop: 2, fontWeight: '500' },

    // Cards
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 14 },
    cardGrid:     { flexDirection: 'row', gap: 12, marginBottom: 20 },
    card:         { flex: 1, borderRadius: 20, padding: 16, alignItems: 'center', minHeight: 110, justifyContent: 'center', overflow: 'hidden' },
    cardEmoji:    { fontSize: 32, marginBottom: 8 },
    cardLabel:    { fontSize: 14, fontWeight: '700' },
    cardAccent:   { position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },

    // Daily challenge
    challengeBanner:    { backgroundColor: '#1A1A2E', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    challengeTitle:     { color: '#fff', fontSize: 17, fontWeight: '800' },
    challengeSub:       { color: '#aaa', fontSize: 12, marginTop: 4 },
    challengeArrow:     { width: 40, height: 40, borderRadius: 20, backgroundColor: '#2D2D4E', justifyContent: 'center', alignItems: 'center' },
    challengeArrowText: { color: '#fff', fontSize: 20, fontWeight: '700' },

    // Guest CTA
    ctaBtn: { backgroundColor: '#845EF7', borderRadius: 14, padding: 16, alignItems: 'center' },
    ctaText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});