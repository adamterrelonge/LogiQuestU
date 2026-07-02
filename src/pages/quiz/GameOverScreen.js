// src/pages/quiz/GameOverScreen.js
// Reached when the user runs out of lives mid-quiz.
// Triggered via: navigation.replace('GameOver', { score, level, subject })

import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ResultButton from '../../components/quiz/ResultButton';

const GameOverScreen = ({ route, navigation }) => {
  // Carry through whatever progress was made before lives ran out
  const { score = 0, level = 1, subject = 'quiz' } = route?.params ?? {};

  const handleRetry = () => {
    // Restart the same subject quiz with fresh state
    navigation.replace('Quiz', { subject });
  };

  const handleDashboard = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <LinearGradient colors={['#8B0000', '#3B0A0A']} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <Text style={styles.emoji}>💔</Text>
        <Text style={styles.title}>Out of Lives!</Text>
        <Text style={styles.subtitle}>You reached Level {level} in {subject}</Text>
        <Text style={styles.score}>Score: {score}</Text>

        <ResultButton label="Try Again" onPress={handleRetry} />
        <ResultButton label="Back to Dashboard" onPress={handleDashboard} variant="outline" />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emoji: { fontSize: 60, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#eee', marginBottom: 4, textAlign: 'center' },
  score: { fontSize: 20, color: '#fff', fontWeight: '700', marginBottom: 20 },
});

export default GameOverScreen; 