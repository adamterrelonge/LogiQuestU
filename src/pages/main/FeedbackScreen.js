// src/pages/main/FeedbackScreen.js
// Shows a breakdown of mistakes per subject, with a button to start
// a review quiz built entirely from those wrong answers.

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { fetchIncorrectAnswers } from '../../utils/supabase';

const SUBJECT_LABELS = { math: 'Maths', english: 'English', science: 'Science' };

const FeedbackScreen = ({ navigation }) => {
    const { session } = useAuth();
    const [mistakes, setMistakes] = useState(null);

    useEffect(() => {
        const userId = session?.user?.id;
        if (!userId) return;
        fetchIncorrectAnswers(userId).then(({ mistakes }) => setMistakes(mistakes));
    }, [session]);

    // Tally mistake counts per subject for the summary cards
    const counts = (mistakes ?? []).reduce((acc, m) => {
        acc[m.subject] = (acc[m.subject] ?? 0) + 1;
        return acc;
    }, {});
    const totalMistakes = mistakes?.length ?? 0;

    return (
        <LinearGradient colors={['#7B2FBE', '#3B82C4', '#56CFD2']} style={styles.flex}>
            <SafeAreaView style={styles.flex}>
                <Text style={styles.title}>Feedback</Text>

                {mistakes === null ? (
                    <ActivityIndicator color="#fff" style={{ marginTop: 30 }} />
                ) : (
                    <View style={styles.body}>
                        {Object.entries(SUBJECT_LABELS).map(([key, label]) => (
                            <View key={key} style={styles.row}>
                                <Text style={styles.rowLabel}>{label}</Text>
                                <Text style={styles.rowCount}>{counts[key] ?? 0} to review</Text>
                            </View>
                        ))}

                        <TouchableOpacity
                            style={[styles.button, totalMistakes === 0 && styles.buttonDisabled]}
                            disabled={totalMistakes === 0}
                            onPress={() => navigation.navigate('ReviewQuiz')}
                        >
                            <Text style={styles.buttonText}>
                                {totalMistakes === 0 ? 'No mistakes yet' : `Practice ${totalMistakes} Mistakes`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    flex:  { flex: 1 },
    title: { fontSize: 22, fontWeight: '700', color: '#111', textAlign: 'center', marginTop: 16, marginBottom: 24 },
    body:  { paddingHorizontal: 24 },
    row:   { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.25)' },
    rowLabel: { color: '#fff', fontSize: 16, fontWeight: '600' },
    rowCount: { color: '#eee', fontSize: 14 },
    button:   { backgroundColor: '#6C4DF0', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 28 },
    buttonDisabled: { backgroundColor: '#6C4DF080' },
    buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});

export default FeedbackScreen; 