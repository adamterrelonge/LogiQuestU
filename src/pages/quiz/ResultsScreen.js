// src/pages/quiz/ResultsScreen.js
// Reached after all questions are answered (with lives still remaining).
// Triggered via: navigation.replace('Results', { score, correct, total, subject })

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ResultButton from '../../components/quiz/ResultButton';

const ResultsScreen = ({ route, navigation }) => {
  const { score = 0, correct = 0, total = 0, subject = 'quiz' } = route?.params ?? {};

  // Guard divide-by-zero; derive accuracy for the feedback message
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  const getMessage = () => {
    if (accuracy >= 80) return 'Excellent work! 🌟';
    if (accuracy >= 50) return 'Good effort! 👍';
    return 'Keep practicing! 💪';
  };

  const handleRetry = () => navigation.replace('Quiz', { subject });
  const handleDashboard = () => navigation.navigate('Dashboard');

  return (
    <LinearGradient colors={['#00C9A7', '#00796B']} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <Text style={styles.emoji}>🏁</Text>
        <Text style={styles.title}>Quiz Complete!</Text>
        <Text style={styles.message}>{getMessage()}</Text>

        <View style={styles.statsBox}>
          <Text style={styles.statLine}>Score: {score}</Text>
          <Text style={styles.statLine}>Correct: {correct}/{total}</Text>
          <Text style={styles.statLine}>Accuracy: {accuracy}%</Text>
        </View>

        <ResultButton label="Play Again" onPress={handleRetry} />
        <ResultButton label="Back to Dashboard" onPress={handleDashboard} variant="outline" />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emoji: { fontSize: 60, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 6 },
  message: { fontSize: 16, color: '#eee', marginBottom: 20 },
  statsBox: { alignItems: 'center', marginBottom: 20 },
  statLine: { fontSize: 18, color: '#fff', fontWeight: '600', marginBottom: 4 },
});

export default ResultsScreen; 