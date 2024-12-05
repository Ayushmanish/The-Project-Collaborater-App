import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CollaboratorDashboard.css";
import { Link } from 'react-router-dom';
const CollaboratorDashboard = () => {
  const [enrolledProjects, setEnrolledProjects] = useState([]);
  const [availableProjects, setAvailableProjects] = useState([]);
  const [user, setUser] = useState({}); // Store user details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch user details
        const userResponse = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `${token}` },
        });
        setUser(userResponse.data.user);
        setTimeout(() => {
          console.log(userResponse.data.user)
        }, 5000);
        // Fetch enrolled projects
        const enrolledResponse = await axios.get("http://localhost:5000/api/projects/enrolled", {
          headers: { Authorization: `${token}` },
        });
        setEnrolledProjects(enrolledResponse.data);

        // Fetch available projects
        const availableResponse = await axios.get("http://localhost:5000/api/projects/available", {
          headers: { Authorization: `${token}` },
        });
        setAvailableProjects(availableResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLeaveProject = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/projects/${projectId}/leave`,
        {},
        { headers: { Authorization: token } }
      );
      alert("You have left the project.");
      // Refresh lists after leaving
      setEnrolledProjects(enrolledProjects.filter((project) => project.id !== projectId));
      setAvailableProjects([...availableProjects]); // Optionally re-fetch if needed
    } catch (error) {
      alert("Error leaving the project.");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="welcome-section">
        <h1>Welcome, {user.username}!</h1>
      </header>
      <div className="content-section">
        {/* Left Section: Enrolled Projects */}
        <div className="enrolled-projects">
          <h2>Enrolled Projects</h2>
          {enrolledProjects.length > 0 ? (
            enrolledProjects.map((project) => (
              <div className="project-card" key={project.id} >
                <Link to={`/collaboration-room`}><div >
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p><strong>Uploaded by:</strong> {project?.uploaderName || 'Unknown'}</p>
                
</div></Link>
<button onClick={() => handleLeaveProject(project._id)}>Leave Project</button>
              </div>
            ))
          ) : (
            <p>You are not enrolled in any projects.</p>
          )}
        </div>

        {/* Right Section: Available Projects */}
        <div className="available-projects">
          <h2>Available Projects</h2>
          {availableProjects.length > 0 ? (
            availableProjects.map((project) => (
              <div className="project-card" key={project.id}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p><strong>Uploaded by:</strong> {project?.uploaderName || 'Unknown'}</p>
                <Link to={`/idea/${project._id}`}><button>View Details</button></Link>
              </div>
            ))
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaboratorDashboard;
