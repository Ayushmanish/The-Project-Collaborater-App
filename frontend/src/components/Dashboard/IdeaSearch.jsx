import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IdeaSearch.css';

const IdeaSearch = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/ideas/search');
        setIdeas(res.data);
      } catch (error) {
        alert('Error fetching ideas.');
      }
    };
    fetchIdeas();
  }, []);

  return (
    <div>
      <h2>Available Ideas</h2>
      {ideas.map((idea) => (
        <div key={idea._id}>
          <h3>{idea.title}</h3>
          <p>{idea.description}</p>
          <p>Tech Stack: {idea.techStack.join(', ')}</p>
          <p>Domain: {idea.domain}</p>
          <p>Slots Available: {idea.slots}</p>
        </div>
      ))}
    </div>
  );
};

export default IdeaSearch;
