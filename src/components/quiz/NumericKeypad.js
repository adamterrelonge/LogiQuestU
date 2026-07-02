// src/components/quiz/NumericKeypad.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Number pad with digits 1-9, 0, backspace (X), and Submit
// onKeyPress receives the pressed digit as a string
// onBackspace removes last entered digit
// onSubmit validates the current answer
const NumericKeypad = ({ onKeyPress, onBackspace, onSubmit }) => {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {digits.map((digit) => (
          <TouchableOpacity
            key={digit}
            style={styles.key}
            onPress={() => onKeyPress(digit)}
          >
            <Text style={styles.keyText}>{digit}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.key} onPress={onBackspace}>
          <Text style={styles.keyText}>⌫</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.key} onPress={() => onKeyPress('0')}>
          <Text style={styles.keyText}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.key} onPress={onSubmit}>
          <Text style={styles.keyText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  key: {
    width: '30%',
    paddingVertical: 14,
    margin: 5,
    backgroundColor: '#ffffff33',
    borderRadius: 10,
    alignItems: 'center',
  },
  keyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default NumericKeypad;