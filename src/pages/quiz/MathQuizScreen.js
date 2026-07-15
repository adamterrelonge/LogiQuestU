// src/pages/quiz/ScienceQuizScreen.js
// Multiple-choice quiz screen for Science, driven by the grade selected
// on GradeSelectScreen (passed via route.params.grade). 

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ScoreHeader from '../../components/quiz/ScoreHeader';
import LivesDisplay from '../../components/quiz/LivesDisplay';
import QuestionCard from '../../components/quiz/QuestionCard';
import MultipleChoiceOptions from '../../components/quiz/MultipleChoiceOptions';
import { mathQuestions } from '../../data/mathQuestions';
import { useAuth } from '../../context/AuthContext';
import { recordIncorrectAnswer } from '../../utils/supabase';

const { session } = useAuth();

const handleSubmit = () => {
    const isCorrect = Number(currentInput) === currentQuestion.answer;

    if (isCorrect) {
        setScore((prev) => prev + 10);
    } else {
        setLives((prev) => Math.max(prev - 1, 0));
        // NEW: persist the mistake so it can show up in Feedback
        if (session?.user?.id) {
            recordIncorrectAnswer(session.user.id, 'math', 'grade6', currentQuestion.id);
        }
    }
    // ...rest unchanged
}; 

const MathQuizScreen = ({ route, navigation }) => {
  const grade = route?.params?.grade ?? 6;
  const questions = mathQuestions[`grade${grade}`] ?? [];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [selected, setSelected] = useState(null);

  const currentQuestion = questions[questionIndex];

  const goToNextQuestion = () => {
    setSelected(null);
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setLevel((prev) => prev + 1);
      setQuestionIndex(0);
    }
  };

  // Checks the selected option, updates score/lives, then advances
  const handleSelectOption = (option) => {
    setSelected(option);
    const isCorrect = option === currentQuestion.answer;
    const nextLives = isCorrect ? lives : Math.max(lives - 1, 0);

    setScore((prev) => (isCorrect ? prev + 10 : prev));
    setLives(nextLives);

    setTimeout(() => {
      if (nextLives <= 0) {
        navigation.replace('GameOver', { score });
      } else {
        goToNextQuestion();
      }
    }, 400);
  };

  if (!currentQuestion) return null;

  return (
    <LinearGradient colors={['#00C9A7', '#00c9ff']} style={styles.container}>
      <ScoreHeader score={score} level={level} totalLevels={4} />
      <LivesDisplay lives={lives} maxLives={3} />

      <QuestionCard
        grade={grade}
        questionNumber={questionIndex + 1}
        totalQuestions={questions.length}
        question={currentQuestion.question}
      />

      <MultipleChoiceOptions
        options={currentQuestion.options}
        selected={selected}
        onSelect={handleSelectOption}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60 },
});

export default MathQuizScreen; 