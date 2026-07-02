// src/components/quiz/QuestionCard.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Shows grade label, question number progress, the question, and a hint
const QuestionCard = ({ grade, questionNumber, totalQuestions, question, hint }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.grade}>Grade {grade}:</Text>
      <Text style={styles.progress}>
        Question {questionNumber} of {totalQuestions}
      </Text>
      <Text style={styles.question}>{question}</Text>
      {hint ? <Text style={styles.hint}>Hint: {hint}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  grade: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  progress: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  question: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  hint: {
    fontSize: 12,
    color: '#eee',
    marginTop: 6,
    fontStyle: 'italic',
  },
});

export default QuestionCard;