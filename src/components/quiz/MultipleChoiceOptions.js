// src/components/quiz/MultipleChoiceOptions.js
// Renders A/B/C/D tappable options. Unlike NumericKeypad, tapping an
// option immediately answers the question via onSelect.

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LETTERS = ['A', 'B', 'C', 'D'];

const MultipleChoiceOptions = ({ options, onSelect }) => (
  <View style={styles.container}>
    {options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={styles.option}
        onPress={() => onSelect(index)}
        activeOpacity={0.8}
      >
        <Text style={styles.letter}>{LETTERS[index]}</Text>
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginTop: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff33',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  letter: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 16,
    width: 28,
  },
  optionText: { color: '#fff', fontSize: 15, flex: 1 },
});

export default MultipleChoiceOptions; 