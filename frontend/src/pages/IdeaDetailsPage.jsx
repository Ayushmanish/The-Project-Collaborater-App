// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './IdeaDetailsPage.css'; // Import the CSS file

// const IdeaDetailsPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [idea, setIdea] = useState(null);

//   useEffect(() => {
//     const fetchIdeaDetails = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/ideas/${id}`);
//         setIdea(res.data);
//       } catch (error) {
//         console.error('Error fetching idea details:', error);
//       }
//     };
//     fetchIdeaDetails();
//   }, [id]);

//   const handleEnroll = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post(
//         `http://localhost:5000/api/ideas/${id}/enroll`,
//         {},
//         { headers: { Authorization: token } }
//       );
//       alert('Enrolled successfully!');
//       navigate('/collaboration-room'); // Navigate to collaboration room
//     } catch (error) {
//       alert('Error enrolling in the idea.');
//     }
//   };

//   if (!idea) return <p>Loading...</p>;

//   return (
//     <div className="details-container">
//       <h1 className="details-header">{idea.title}</h1>
//       <div className="details-content">
//         <p>{idea.description}</p>
//         <p><strong>Domain:</strong> {idea.domain}</p>
//         <p><strong>Tech Stack:</strong> {idea.techStack.join(', ')}</p>
//         <p><strong>Slots Available:</strong> {idea.slots}</p>
//         <button className="enroll-button" onClick={handleEnroll}>
//           Enroll
//         </button>
//       </div>
//     </div>
//   );
// };

// export default IdeaDetailsPage;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './IdeaDetailsPage.css'; // Import the CSS file

const IdeaDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  // const handleEnroll = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     await axios.post(
  //       `http://localhost:5000/api/ideas/${id}/enroll`,
  //       {},
  //       { headers: { Authorization: token } }
  //     );
  //     alert('Enrolled successfully!');
  //     navigate('/collaboration-room'); // Navigate to collaboration room
  //   } catch (error) {
  //     alert('Error enrolling in the idea.');
  //   }
  // };

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to enroll.');
        return;
      }
  
      const response = await axios.post(
        `http://localhost:5000/api/ideas/${id}/enroll`,
        {}, // Provide additional data if required
        { headers: { Authorization: `${token}` } } // Ensure Bearer prefix if required
      );
  
      alert(response.data.message || 'Enrolled successfully!');
      navigate('/collaboration-room'); // Navigate to the collaboration room
    } catch (error) {
      console.error('Error enrolling in the idea:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Error enrolling in the idea.');
    }
  };
  

  if (!idea) return <p>Loading...</p>;

  return (
    <div className="details-container">
      <h1 className="details-header">{idea.title}</h1>
      <div className="details-content">
        <p>{idea.description}</p>
        <p><strong>Domain:</strong> {idea.domain}</p>
        <p><strong>Tech Stack:</strong> {idea.techStack.join(', ')}</p>
        <p><strong>Slots Available:</strong> {idea.slots}</p>
        {
          idea.slots >0 ? <button className="enroll-button" onClick={handleEnroll} >
          Enroll
        </button> : <p>Course already filled</p>
        }
      </div>
    </div>
  );
};

export default IdeaDetailsPage;
