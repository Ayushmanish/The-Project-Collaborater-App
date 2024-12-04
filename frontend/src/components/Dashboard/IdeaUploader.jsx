import React, { useState } from 'react';
import axios from 'axios';
import './IdeaUploader.css';

const IdeaUploader = () => {
  const [idea, setIdea] = useState({ title: '', description: '', techStack: '', domain: '', slots: 0, quiz: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // await axios.post('http://localhost:5000/api/ideas/create', idea, { headers: { Authorization: token } });
      await axios.post('http://localhost:5000/api/ideas/create', idea, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(token)}`, // Include "Bearer" if your backend expects it
        },
      });
      
      alert('Idea uploaded successfully!');
    } catch (error) {
      alert('Error uploading idea.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" onChange={(e) => setIdea({ ...idea, title: e.target.value })} />
      <textarea placeholder="Description" onChange={(e) => setIdea({ ...idea, description: e.target.value })}></textarea>
      <input type="text" placeholder="Tech Stack (comma-separated)" onChange={(e) => setIdea({ ...idea, techStack: e.target.value.split(',') })} />
      <input type="text" placeholder="Domain" onChange={(e) => setIdea({ ...idea, domain: e.target.value })} />
      <input type="number" placeholder="Slots" onChange={(e) => setIdea({ ...idea, slots: e.target.value })} />
      <input type="text" placeholder="Quiz URL (optional)" onChange={(e) => setIdea({ ...idea, quiz: e.target.value })} />
      <button type="submit">Upload Idea</button>
    </form>
  );
};

export default IdeaUploader;
