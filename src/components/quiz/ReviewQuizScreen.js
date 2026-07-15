// src/pages/quiz/ReviewQuizScreen.js
// Plays a quiz built entirely from the user's past incorrect answers,
// mixed across subjects. Correct answers clear the mistake from Supabase.

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { fetchIncorrectAnswers, clearIncorrectAnswer } from '../../utils/supabase';
import { buildReviewQuiz } from '../../utils/reviewQuizBuilder';
import QuestionCard from '../../components/quiz/QuestionCard';
import ScoreHeader from '../../components/quiz/ScoreHeader';
import ReviewAnswerInput from '../../components/quiz/ReviewAnswerInput';

const ReviewQuizScreen = ({ navigation }) => {
    const { session } = useAuth();
    const [questions, setQuestions] = useState(null);
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [input, setInput] = useState('');

    useEffect(() => {
        const userId = session?.user?.id;
        if (!userId) return;
        fetchIncorrectAnswers(userId).then(({ mistakes }) => {
            setQuestions(buildReviewQuiz(mistakes));
        });
    }, [session]);

    const current = questions?.[index];

    // Shared "next question or finish" step
    const advance = () => {
        setInput('');
        if (index + 1 < questions.length) {
            setIndex((i) => i + 1);
        } else {
            navigation.replace('ResultsScreen', { score, total: questions.length });
        }
    };

    const handleCorrect = async () => {
        setScore((s) => s + 10);
        await clearIncorrectAnswer(session.user.id, current.subject, current.id);
        advance();
    };

    // Math: numeric submit
    const handleNumericSubmit = () => {
        (Number(input) === current.answer ? handleCorrect : advance)();
    };

    // English: option select
    const handleOptionSelect = (selectedLetter) => {
        (selectedLetter === current.correctAnswer ? handleCorrect : advance)();
    };

    if (!questions) return <ActivityIndicator style={styles.loading} color="#fff" />;
    if (questions.length === 0) {
        return (
            <LinearGradient colors={['#6a5acd', '#00c9ff']} style={styles.center}>
                <Text style={styles.emptyText}>No mistakes to review — nice work! 🎉</Text>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={['#6a5acd', '#00c9ff']} style={styles.container}>
            <ScoreHeader score={score} level={index + 1} totalLevels={questions.length} />
            <QuestionCard
                grade={current.grade?.replace('grade', '')}
                questionNumber={index + 1}
                totalQuestions={questions.length}
                question={current.question}
                hint={current.hint}
            />
            <Text style={styles.inputDisplay}>{input || ' '}</Text>
            <ReviewAnswerInput
                question={current}
                onKeyPress={(d) => setInput((p) => p + d)}
                onBackspace={() => setInput((p) => p.slice(0, -1))}
                onSubmit={handleNumericSubmit}
                onSelectOption={handleOptionSelect}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container:    { flex: 1, paddingTop: 60 },
    loading:      { flex: 1 },
    center:       { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
    emptyText:    { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: '600' },
    inputDisplay: { textAlign: 'center', fontSize: 28, color: '#fff', fontWeight: 'bold', minHeight: 40 },
});

export default ReviewQuizScreen; 