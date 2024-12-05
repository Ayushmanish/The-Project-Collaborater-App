import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignUpForm.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: '' });
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      setSignupSuccess(true); // Mark signup as successful
    } catch (error) {
      setError(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-form-container">
      {signupSuccess ? (
        <div className="success-message">
          <h2>Signup Successful!</h2>
          <p>
            Your account has been created. You can now <Link to="/">Log In</Link>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSignup} className="signup-form">
          <h2>Create an Account</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <select
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          >
            <option value="">Select Role</option>
            <option value="Uploader">Uploader</option>
            <option value="Collaborator">Collaborator</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default SignupForm;
