// src/data/englishQuestions.js
// Static question bank grouped by grade level.
// Each question has an `instruction` (bold prompt shown above the
// question) and a `question` (the analogy/prompt itself), plus
// multiple choice options — matching the verbal analogy format.

export const englishQuestions = {
    grade6: [
      {
        id: 'e6q1',
        instruction: 'Complete the below verbal analogy:',
        question: 'Dreary : Dull : Petty : ?',
        options: ['Shrewd', 'Humble', 'Unimportant', 'Amenable'],
        correctIndex: 2,
        hint: 'Petty and dull share a similar negative quality.',
      },
      {
        id: 'e6q2',
        instruction: 'Complete the below verbal analogy:',
        question: 'Loud : Quiet : Fast : ?',
        options: ['Speedy', 'Slow', 'Sudden', 'Noisy'],
        correctIndex: 1,
        hint: 'Look for the opposite relationship.',
      },
      {
        id: 'e6q3',
        instruction: 'Choose the word that best completes the sentence:',
        question: 'The scientist made a _____ discovery that changed history.',
        options: ['Trivial', 'Groundbreaking', 'Forgettable', 'Ordinary'],
        correctIndex: 1,
      },
      {
        id: 'e6q4',
        instruction: 'Complete the below verbal analogy:',
        question: 'Author : Book : Sculptor : ?',
        options: ['Museum', 'Statue', 'Chisel', 'Clay'],
        correctIndex: 1,
        hint: 'Think about what each profession creates.',
      },
      {
        id: 'e6q5',
        instruction: 'Choose the correctly spelled word:',
        question: 'Select the correct spelling:',
        options: ['Recieve', 'Receive', 'Receeve', 'Receve'],
        correctIndex: 1,
      },
      // Add more questions here
    ],
  }; 