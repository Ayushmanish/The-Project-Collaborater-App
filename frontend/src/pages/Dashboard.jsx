import React from 'react';
import IdeaUploader from '../components/Dashboard/IdeaUploader';
import IdeaSearch from '../components/Dashboard/IdeaSearch';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <center><h1>Dashboard</h1></center>
      <IdeaUploader />
      <IdeaSearch />
    </div>
  );
};

export default Dashboard;
