// src/components/quiz/ExitQuizButton.js
// Small "X" button shown during a quiz. Confirms before leaving,
// since navigating away mid-quiz loses current progress.

import React from 'react';
import { TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ExitQuizButton = ({ navigation }) => {
  const handleExit = () => {
    Alert.alert(
      'Leave Quiz?',
      'Your current progress will be lost if you exit now.',
      [
        { text: 'Stay', style: 'cancel' },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => navigation.navigate('Dashboard'),
        },
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleExit} hitSlop={10}>
      <Ionicons name="close" size={26} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 55,
    right: 20,
    zIndex: 10,
  },
});

export default ExitQuizButton; 