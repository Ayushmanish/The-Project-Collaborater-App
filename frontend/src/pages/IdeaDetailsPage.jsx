import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const IdeaDetailsPage = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);

  useEffect(() => {
    const fetchIdeaDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/ideas/${id}`);
        setIdea(res.data);
      } catch (error) {
        console.error('Error fetching idea details:', error);
      }
    };
    fetchIdeaDetails();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/ideas/${id}/enroll`, {}, { headers: { Authorization: token } });
      alert('Enrolled successfully!');
    } catch (error) {
      alert('Error enrolling in the idea.');
    }
  };

  if (!idea) return <p>Loading...</p>;

  return (
    <div>
      <h2>{idea.title}</h2>
      <p>{idea.description}</p>
      <p>Domain: {idea.domain}</p>
      <p>Tech Stack: {idea.techStack.join(', ')}</p>
      <p>Slots Available: {idea.slots}</p>
      <button onClick={handleEnroll}>Enroll</button>
    </div>
  );
};

export default IdeaDetailsPage;
