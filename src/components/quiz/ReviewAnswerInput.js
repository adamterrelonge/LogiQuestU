// src/components/quiz/ReviewAnswerInput.js
// Renders the right answer UI depending on the mistake's subject.
// ASSUMPTION: english questions expose `options` (A-D) and `correctAnswer`
// (the correct letter) — adjust field names here if EnglishQuizScreen's
// actual question shape differs.

import React from 'react';
import NumericKeypad from './NumericKeypad';
import MultipleChoiceOptions from './MultipleChoiceOptions';

const ReviewAnswerInput = ({ question, onKeyPress, onBackspace, onSubmit, onSelectOption }) => {
    if (question.subject === 'math') {
        return <NumericKeypad onKeyPress={onKeyPress} onBackspace={onBackspace} onSubmit={onSubmit} />;
    }

    if (question.subject === 'english') {
        return (
            <MultipleChoiceOptions
                options={question.options}
                onSelect={onSelectOption}
            />
        );
    }

    return null; // subject not supported yet (e.g. science)
};

export default ReviewAnswerInput; 