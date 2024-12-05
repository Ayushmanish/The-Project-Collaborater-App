// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import UploaderDashboard from './pages/UploaderDashboard';
// import CollaboratorDashboard from './pages/CollaboratorDashboard';
// import IdeaDetailsPage from './pages/IdeaDetailsPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default route redirects to login */}
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Separate routes for role-based dashboards */}
//         <Route path="/uploader-dashboard" element={<UploaderDashboard />} />
//         <Route path="/collaborator-dashboard" element={<CollaboratorDashboard />} />
//         <Route path="/idea/:id" element={<IdeaDetailsPage />} />

//         {/* Fallback for undefined routes */}
//         <Route path="*" element={<h2>404: Page Not Found</h2>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UploaderDashboard from './pages/UploaderDashboard';
import CollaboratorDashboard from './pages/CollaboratorDashboard';
import IdeaDetailsPage from './pages/IdeaDetailsPage';
import CollaborationRoom from './pages/CollaborationRoom'; // Import the new component

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
        <Route path="/idea/:id" element={<IdeaDetailsPage />} />

        {/* Route for collaboration room */}
        <Route path="/collaboration-room" element={<CollaborationRoom />} />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
