import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UploaderDashboard from './pages/UploaderDashboard';
import CollaboratorDashboard from './pages/CollaboratorDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Separate routes for role-based dashboards */}
        <Route path="/uploader-dashboard" element={<UploaderDashboard />} />
        <Route path="/collaborator-dashboard" element={<CollaboratorDashboard />} />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;

