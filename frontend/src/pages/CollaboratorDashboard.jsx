import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CollaboratorDashboard.css'; // Import the CSS file

const CollaboratorDashboard = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/ideas/search');
        setIdeas(res.data);
      } catch (error) {
        console.error('Error fetching ideas:', error);
      }
    };
    fetchIdeas();
  }, []);

  return (
    <div>
      <h1 className="header">Collaborator Dashboard</h1>
      <div className="dashboard-container">
        {ideas.map((idea) => (
          <div className="card" key={idea._id}>
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
            <p><strong>Uploaded by:</strong> {idea.uploaderId?.username || 'Unknown'}</p>
            <Link to={`/idea/${idea._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaboratorDashboard;
