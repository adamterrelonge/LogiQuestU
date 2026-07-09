// src/components/quiz/QuestionCard.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Shows grade label, question number progress, an optional bold
// instruction line, the question/prompt, and an optional hint.
const QuestionCard = ({ grade, questionNumber, totalQuestions, instruction, question, hint }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.grade}>Grade {grade}:</Text>
      <Text style={styles.progress}>
        Question {questionNumber} of {totalQuestions}
      </Text>

      {/* Bold prompt, e.g. "Complete the below verbal analogy:" */}
      {instruction ? <Text style={styles.instruction}>{instruction}</Text> : null}

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
  instruction: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginTop: 12,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  question: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  hint: {
    fontSize: 12,
    color: '#eee',
    marginTop: 6,
    fontStyle: 'italic',
  },
});

export default QuestionCard; 