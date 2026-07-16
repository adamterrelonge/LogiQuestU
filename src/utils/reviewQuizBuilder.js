// src/utils/reviewQuizBuilder.js
// Turns 'incorrect_answers' rows into full question objects by looking
// them up in the static question banks (keeps question content in one
// place instead of duplicating it into the database).

import { mathQuestions } from '../data/mathQuestions';
import { englishQuestions } from '../data/englishQuestions';

const BANKS = {
    math: mathQuestions,
    english: englishQuestions,
    // science: scienceQuestions,  ← add once scienceQuestions.js exists
};

// Finds a single question object by subject/grade/id
const findQuestion = (subject, grade, questionId) => {
    const bank = BANKS[subject];
    if (!bank || !bank[grade]) return null;
    return bank[grade].find((q) => q.id === questionId) ?? null;
};

// Converts mistake rows -> playable question objects, tagged with subject
// so the review quiz screen knows which answer UI to render.
export function buildReviewQuiz(mistakes) {
    return mistakes
        .map((m) => {
            const question = findQuestion(m.subject, m.grade, m.question_id);
            if (!question) return null; // question bank may have changed since it was recorded
            return { ...question, subject: m.subject, grade: m.grade };
        })
        .filter(Boolean);
} 