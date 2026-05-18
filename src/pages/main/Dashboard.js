// src/pages/main/Dashboard.js
// Main dashboard shown after user logs in

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

// ── Subject card data ──────────────────────────────────────────────
const SUBJECTS = [
  { id: 'science', label: 'Science', emoji: '🔬', color: '#00C9A7', bg: '#E6FBF7' },
  { id: 'math',    label: 'Maths',   emoji: '📐', color: '#FF6B6B', bg: '#FFF0F0' },
  { id: 'english', label: 'English', emoji: '📖', color: '#845EF7', bg: '#F3EEFF' },
];

// ── Stat pill data ─────────────────────────────────────────────────
const STATS = [
  { label: 'Streak',    value: '3🔥' },
  { label: 'Best Score', value: '95%' },
  { label: 'Quizzes',   value: '12'  },
];

// ── Sub-components ─────────────────────────────────────────────────

/** Top greeting bar with sign-out button */
const Header = ({ onSignOut }) => (
  <View style={styles.header}>
    <View>
      <Text style={styles.greeting}>Welcome back 👋</Text>
      <Text style={styles.appName}>LogiQuest</Text>
    </View>
    <TouchableOpacity style={styles.signOutBtn} onPress={onSignOut}>
      <Text style={styles.signOutText}>Sign Out</Text>
    </TouchableOpacity>
  </View>
);

/** Row of quick-stat pills */
const StatsRow = () => (
  <View style={styles.statsRow}>
    {STATS.map((s) => (
      <View key={s.label} style={styles.statPill}>
        <Text style={styles.statValue}>{s.value}</Text>
        <Text style={styles.statLabel}>{s.label}</Text>
      </View>
    ))}
  </View>
);

/** Tappable subject card */
const SubjectCard = ({ subject, onPress }) => (
  <TouchableOpacity
    style={[styles.card, { backgroundColor: subject.bg }]}
    onPress={() => onPress(subject.id)}
    activeOpacity={0.75}
  >
    <Text style={styles.cardEmoji}>{subject.emoji}</Text>
    <Text style={[styles.cardLabel, { color: subject.color }]}>
      {subject.label}
    </Text>
    <View style={[styles.cardAccent, { backgroundColor: subject.color }]} />
  </TouchableOpacity>
);

// ── Main Dashboard ─────────────────────────────────────────────────
const Dashboard = ({ navigation }) => {
  const { signOut } = useAuth();

  const handleSubjectPress = (subjectId) => {
    // TODO: navigate to quiz screen
    // navigation.navigate('Quiz', { subject: subjectId });
    console.log('Subject selected:', subjectId);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>

        <Header onSignOut={signOut} />

        {/* Quick stats */}
        <StatsRow />

        {/* Section heading */}
        <Text style={styles.sectionTitle}>Choose a Subject</Text>

        {/* Subject cards */}
        <View style={styles.cardGrid}>
          {SUBJECTS.map((s) => (
            <SubjectCard key={s.id} subject={s} onPress={handleSubjectPress} />
          ))}
        </View>

        {/* Daily challenge banner */}
        <TouchableOpacity style={styles.challengeBanner} activeOpacity={0.8}>
          <Text style={styles.challengeTitle}>⚡ Daily Challenge</Text>
          <Text style={styles.challengeSub}>Mixed topics · 10 questions</Text>
          <View style={styles.challengeArrow}>
            <Text style={styles.challengeArrowText}>→</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

// ── Styles ─────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe:  { flex: 1, backgroundColor: '#F7F8FC' },
  scroll: { padding: 20, paddingBottom: 40 },

  /* Header */
  header:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  greeting:    { fontSize: 14, color: '#888', fontWeight: '500' },
  appName:     { fontSize: 28, fontWeight: '800', color: '#1A1A2E', letterSpacing: -0.5 },
  signOutBtn:  { backgroundColor: '#FFE8E8', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  signOutText: { color: '#FF6B6B', fontWeight: '600', fontSize: 13 },

  /* Stats */
  statsRow:   { flexDirection: 'row', gap: 10, marginBottom: 28 },
  statPill:   { flex: 1, backgroundColor: '#fff', borderRadius: 16, paddingVertical: 14, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  statValue:  { fontSize: 18, fontWeight: '800', color: '#1A1A2E' },
  statLabel:  { fontSize: 11, color: '#999', marginTop: 2, fontWeight: '500' },

  /* Section title */
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 14 },

  /* Subject cards */
  cardGrid:   { flexDirection: 'row', gap: 12, marginBottom: 20 },
  card:       { flex: 1, borderRadius: 20, padding: 16, alignItems: 'center', minHeight: 110, justifyContent: 'center', overflow: 'hidden' },
  cardEmoji:  { fontSize: 32, marginBottom: 8 },
  cardLabel:  { fontSize: 14, fontWeight: '700' },
  cardAccent: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },

  /* Daily challenge */
  challengeBanner: { backgroundColor: '#1A1A2E', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center' },
  challengeTitle:  { color: '#fff', fontSize: 17, fontWeight: '800', flex: 1 },
  challengeSub:    { color: '#aaa', fontSize: 12, marginTop: 3, position: 'absolute', bottom: 20, left: 20 },
  challengeArrow:  { width: 40, height: 40, borderRadius: 20, backgroundColor: '#2D2D4E', justifyContent: 'center', alignItems: 'center' },
  challengeArrowText: { color: '#fff', fontSize: 20, fontWeight: '700' },
});