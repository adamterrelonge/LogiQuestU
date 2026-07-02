// src/components/quiz/ScoreHeader.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Displays current score (left) and level progress (right)
const ScoreHeader = ({ score, level, totalLevels }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Score: {score}</Text>
      <Text style={styles.text}>Level {level}/{totalLevels}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
});

export default ScoreHeader;