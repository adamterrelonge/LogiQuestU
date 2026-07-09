// src/pages/quiz/EnglishQuizScreen.js

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ScoreHeader from '../../components/quiz/ScoreHeader';
import LivesDisplay from '../../components/quiz/LivesDisplay';
import QuestionCard from '../../components/quiz/QuestionCard';
import MultipleChoiceOptions from '../../components/quiz/MultipleChoiceOptions';
import ExitQuizButton from '../../components/quiz/ExitQuizButton';
import { englishQuestions } from '../../data/englishQuestions';

const EnglishQuizScreen = ({ navigation }) => {
  const questions = englishQuestions.grade6;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questions[questionIndex];

  const handleAnswer = (index) => {
    const isCorrect = index === currentQuestion.correctIndex;
    const newLives = isCorrect ? lives : Math.max(lives - 1, 0);
    const newScore = isCorrect ? score + 10 : score;
    const newCorrect = isCorrect ? correctCount + 1 : correctCount;

    setLives(newLives);
    setScore(newScore);
    setCorrectCount(newCorrect);

    if (newLives === 0) {
      navigation.replace('GameOver', { score: newScore, level, subject: 'english' });
      return;
    }

    const isLastQuestion = questionIndex + 1 >= questions.length;

    if (isLastQuestion) {
      navigation.replace('Results', {
        score: newScore,
        correct: newCorrect,
        total: questions.length,
        subject: 'english',
      });
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <LinearGradient colors={['#845EF7', '#5F3DC4']} style={styles.container}>
      <ExitQuizButton navigation={navigation} />

      <ScoreHeader score={score} level={level} totalLevels={4} />
      <LivesDisplay lives={lives} maxLives={3} />

      <QuestionCard
  grade="6"
  questionNumber={questionIndex + 1}
  totalQuestions={questions.length}
  instruction={currentQuestion.instruction}
  question={currentQuestion.question}
  hint={currentQuestion.hint}
/> 
      <MultipleChoiceOptions
        options={currentQuestion.options}
        onSelect={handleAnswer}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
});

export default EnglishQuizScreen; 