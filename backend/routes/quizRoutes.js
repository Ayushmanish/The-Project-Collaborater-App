import express from 'express';
const router = express.Router();
import Quiz from '../models/Quiz.js';

// Route to upload a quiz
router.post('/upload', async (req, res) => {
  const { ideaId, questions } = req.body;

  try {
    const quiz = new Quiz({ ideaId, questions });
    await quiz.save();
    res.status(201).json({ message: 'Quiz uploaded successfully!', quiz });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading quiz.' });
  }
});

// Route to take a quiz
router.post('/take', async (req, res) => {
  const { quizId, answers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found.' });

    // Validate answers
    const score = quiz.questions.reduce((acc, question, index) => {
      return acc + (question.correctAnswer === answers[index] ? 1 : 0);
    }, 0);

    res.status(200).json({ message: 'Quiz completed.', score });
  } catch (error) {
    res.status(500).json({ error: 'Error taking quiz.' });
  }
});

export default router;
