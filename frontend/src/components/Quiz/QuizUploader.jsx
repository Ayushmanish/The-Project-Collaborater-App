import React, { useState } from 'react';
import axios from 'axios';
import './QuizUploader.css';

const QuizUploader = () => {
  const [quiz, setQuiz] = useState([{ question: '', options: ['', '', '', ''], correctOption: 0 }]);

  const handleAddQuestion = () => {
    setQuiz([...quiz, { question: '', options: ['', '', '', ''], correctOption: 0 }]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[index].question = value;
    setQuiz(updatedQuiz);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[qIndex].options[oIndex] = value;
    setQuiz(updatedQuiz);
  };

  const handleCorrectOptionChange = (qIndex, value) => {
    const updatedQuiz = [...quiz];
    updatedQuiz[qIndex].correctOption = parseInt(value);
    setQuiz(updatedQuiz);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/ideas/upload',
        { quiz: JSON.stringify(quiz) },
        { headers: { Authorization: token } }
      );
      alert('Quiz uploaded successfully!');
    } catch (error) {
      alert('Error uploading quiz.');
    }
  };

  return (
    <div>
      <h2>Quiz Uploader</h2>
      {quiz.map((q, qIndex) => (
        <div key={qIndex}>
          <input
            type="text"
            placeholder={`Question ${qIndex + 1}`}
            value={q.question}
            onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
          />
          {q.options.map((option, oIndex) => (
            <input
              key={oIndex}
              type="text"
              placeholder={`Option ${oIndex + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
            />
          ))}
          <select
            value={q.correctOption}
            onChange={(e) => handleCorrectOptionChange(qIndex, e.target.value)}
          >
            {q.options.map((_, index) => (
              <option key={index} value={index}>
                Option {index + 1}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Upload Quiz</button>
    </div>
  );
};

export default QuizUploader;
