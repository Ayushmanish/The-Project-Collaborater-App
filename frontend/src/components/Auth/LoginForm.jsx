// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './LoginForm.css';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
//       localStorage.setItem('token', res.data.token);
//       alert('Login successful!');
//       navigate('/dashboard');
//     } catch (error) {
//       alert('Invalid login credentials.');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//       <p>
//       Don't have an account? <a href="/signup">Sign up</a>
//     </p>
//     </form>
//   );
// };

// export default LoginForm;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Store the token in localStorage
      localStorage.setItem('token', res.data.token);

      // Decode the JWT token to extract the role
      const payload = JSON.parse(atob(res.data.token.split('.')[1])); // Decode base64 payload
      const userRole = payload.role;

      alert('Login successful!');

      // Redirect based on role
      if (userRole === 'Uploader') {
        navigate('/uploader-dashboard');
      } else if (userRole === 'Collaborator') {
        navigate('/collaborator-dashboard');
      } else {
        alert('Unknown user role. Please contact support.');
      }
    } catch (error) {
      alert('Invalid login credentials.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </form>
  );
};

export default LoginForm;
