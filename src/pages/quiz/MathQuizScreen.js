// src/pages/quiz/MathQuizScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ScoreHeader from '../../components/quiz/ScoreHeader';
import LivesDisplay from '../../components/quiz/LivesDisplay';
import QuestionCard from '../../components/quiz/QuestionCard';
import NumericKeypad from '../../components/quiz/NumericKeypad';
import ExitQuizButton from '../../components/quiz/ExitQuizButton';
import { mathQuestions } from '../../data/mathQuestions';

// navigation must be destructured here — QuizRouter passes it down,
// and it's required both for the exit button and for GameOver/Results
const MathQuizScreen = ({ navigation }) => {
  const questions = mathQuestions.grade6;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentInput, setCurrentInput] = useState('');

  const currentQuestion = questions[questionIndex];

  const handleKeyPress = (digit) => {
    setCurrentInput((prev) => prev + digit);
  };

  const handleBackspace = () => {
    setCurrentInput((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    const isCorrect = Number(currentInput) === currentQuestion.answer;
    const newLives = isCorrect ? lives : Math.max(lives - 1, 0);
    const newScore = isCorrect ? score + 10 : score;
    const newCorrect = isCorrect ? correctCount + 1 : correctCount;

    setScore(newScore);
    setLives(newLives);
    setCorrectCount(newCorrect);
    setCurrentInput('');

    if (newLives === 0) {
      navigation.replace('GameOver', { score: newScore, level, subject: 'math' });
      return;
    }

    const isLastQuestion = questionIndex + 1 >= questions.length;

    if (isLastQuestion) {
      navigation.replace('Results', {
        score: newScore,
        correct: newCorrect,
        total: questions.length,
        subject: 'math',
      });
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <LinearGradient colors={['#6a5acd', '#00c9ff']} style={styles.container}>
      <ExitQuizButton navigation={navigation} />

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
  container: { flex: 1, paddingTop: 60 },
  inputDisplay: {
    textAlign: 'center',
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    minHeight: 40,
  },
});

export default MathQuizScreen; 