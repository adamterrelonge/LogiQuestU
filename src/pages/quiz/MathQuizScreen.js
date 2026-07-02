// src/pages/quiz/MathQuizScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ScoreHeader from '../../components/quiz/ScoreHeader';
import LivesDisplay from '../../components/quiz/LivesDisplay';
import QuestionCard from '../../components/quiz/QuestionCard';
import NumericKeypad from '../../components/quiz/NumericKeypad';
import { mathQuestions } from '../../data/mathQuestions';

const MathQuizScreen = () => {
  const questions = mathQuestions.grade6;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [currentInput, setCurrentInput] = useState('');

  const currentQuestion = questions[questionIndex];

  // Appends a pressed digit to the current input string
  const handleKeyPress = (digit) => {
    setCurrentInput((prev) => prev + digit);
  };

  // Removes the last character from input
  const handleBackspace = () => {
    setCurrentInput((prev) => prev.slice(0, -1));
  };

  // Checks answer, updates score/lives, and advances to next question
  const handleSubmit = () => {
    const isCorrect = Number(currentInput) === currentQuestion.answer;

    if (isCorrect) {
      setScore((prev) => prev + 10);
    } else {
      setLives((prev) => Math.max(prev - 1, 0));
    }

    setCurrentInput('');

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      // Reached end of question set — logic for level completion goes here
      setLevel((prev) => prev + 1);
      setQuestionIndex(0);
    }
  };

  return (
    <LinearGradient colors={['#6a5acd', '#00c9ff']} style={styles.container}>
      <ScoreHeader score={score} level={level} totalLevels={4} />
      <LivesDisplay lives={lives} maxLives={3} />

      <QuestionCard
        grade="6"
        questionNumber={questionIndex + 1}
        totalQuestions={questions.length}
        question={currentQuestion.question}
        hint={currentQuestion.hint}
      />

      <Text style={styles.inputDisplay}>{currentInput || ' '}</Text>

      <NumericKeypad
        onKeyPress={handleKeyPress}
        onBackspace={handleBackspace}
        onSubmit={handleSubmit}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  inputDisplay: {
    textAlign: 'center',
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    minHeight: 40,
  },
});

export default MathQuizScreen;