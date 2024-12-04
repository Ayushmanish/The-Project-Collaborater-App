import React, { useState } from 'react';
import axios from 'axios';
import './SignUpForm.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: '' });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert('Signup successful! Please login.');
    } catch (error) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input type="text" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
      <select onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
        <option value="">Select Role</option>
        <option value="Uploader">Uploader</option>
        <option value="Collaborator">Collaborator</option>
      </select>
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
