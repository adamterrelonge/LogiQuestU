// src/pages/quiz/GradeSelectScreen.js

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const GRADES = [6, 7, 8, 9];

const SUBJECT_THEME = {
  math: { label: 'Maths', color: '#FF6B6B', bg: '#FFF0F0' },
  english: { label: 'English', color: '#845EF7', bg: '#F3EEFF' },
  science: { label: 'Science', color: '#00C9A7', bg: '#E6FBF7' },
};

const GradeSelectScreen = ({ route, navigation }) => {
  const { subject } = route.params ?? {};
  const theme = SUBJECT_THEME[subject] ?? SUBJECT_THEME.math;

  const handleGradePress = (grade) => {
    navigation.navigate('Quiz', {
      subject,
      grade,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Choose a Grade</Text>
      <Text style={styles.subtitle}>
        {theme.label} questions for grades 6 - 9
      </Text>

      <View style={styles.grid}>
        {GRADES.map((grade) => (
          <TouchableOpacity
            key={grade}
            style={[styles.card, { backgroundColor: theme.bg }]}
            onPress={() => handleGradePress(grade)}
            activeOpacity={0.8}
          >
            <Text style={[styles.cardText, { color: theme.color }]}>
              Grade {grade}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F8FC', padding: 20 },
  title: { fontSize: 26, fontWeight: '800', color: '#1A1A2E', marginTop: 10 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: '47%',
    borderRadius: 16,
    paddingVertical: 28,
    alignItems: 'center',
  },
  cardText: { fontSize: 18, fontWeight: '700' },
});

export default GradeSelectScreen;