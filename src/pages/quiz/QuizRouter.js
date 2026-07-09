// src/pages/quiz/QuizRouter.js
// Registered as the "Quiz" screen in MainStack. Reads route.params.subject
// and renders the matching quiz screen, passing navigation/route through.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MathQuizScreen from './MathQuizScreen';
import EnglishQuizScreen from './EnglishQuizScreen';

const QuizRouter = ({ route, navigation }) => {
  const subject = route?.params?.subject ?? 'math';

  if (subject === 'math') {
    return <MathQuizScreen route={route} navigation={navigation} />;
  }

  if (subject === 'english') {
    return <EnglishQuizScreen route={route} navigation={navigation} />;
  }

  // Science (or anything else) has no question bank yet
  return (
    <LinearGradient colors={['#6a5acd', '#00c9ff']} style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.text}>
          {subject.charAt(0).toUpperCase() + subject.slice(1)} quiz is coming soon!
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  text: { color: '#fff', fontSize: 20, fontWeight: '600', textAlign: 'center' },
});

export default QuizRouter; 