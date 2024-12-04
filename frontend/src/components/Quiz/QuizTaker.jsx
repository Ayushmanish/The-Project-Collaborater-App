import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizTaker.css'

const QuizTaker = ({ ideaId }) => {
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/ideas/${ideaId}/quiz`);
        setQuiz(JSON.parse(res.data.quiz));
      } catch (error) {
        alert('Error fetching quiz.');
      }
    };
    fetchQuiz();
  }, [ideaId]);

  const handleAnswerChange = (qIndex, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[qIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let score = 0;
    quiz.forEach((q, index) => {
      if (parseInt(answers[index]) === q.correctOption) score++;
    });
    alert(`Quiz submitted! Your score: ${score}/${quiz.length}`);
  };

  return (
    <div>
      <h2>Take Quiz</h2>
      {quiz.map((q, qIndex) => (
        <div key={qIndex}>
          <p>{q.question}</p>
          {q.options.map((option, oIndex) => (
            <label key={oIndex}>
              <input
                type="radio"
                name={`question-${qIndex}`}
                value={oIndex}
                onChange={(e) => handleAnswerChange(qIndex, e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default QuizTaker;
