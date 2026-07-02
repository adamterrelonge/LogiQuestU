// src/components/quiz/ResultButton.js
// Reusable button used by both GameOverScreen and ResultsScreen

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ResultButton = ({ label, onPress, variant = 'solid' }) => (
  <TouchableOpacity
    style={[styles.base, variant === 'outline' && styles.outline]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Text style={[styles.text, variant === 'outline' && styles.outlineText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 14,
    width: '80%',
    alignItems: 'center',
    marginTop: 12,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  text: { color: '#333', fontWeight: '700', fontSize: 16 },
  outlineText: { color: '#fff' },
});

export default ResultButton; 