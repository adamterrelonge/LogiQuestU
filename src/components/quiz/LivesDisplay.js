// src/components/quiz/LivesDisplay.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Renders one heart per remaining life; max lives is passed for full row reference
const LivesDisplay = ({ lives, maxLives = 3 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: maxLives }).map((_, index) => (
        <Text key={index} style={styles.heart}>
          {index < lives ? '❤️' : '🖤'}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  heart: {
    fontSize: 22,
    marginLeft: 4,
  },
});

export default LivesDisplay;