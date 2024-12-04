// const express = require('express');
// // import express from 'express';
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Database connection
// connectDB();

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/ideas', require('./routes/ideaRoutes'));
// app.use('/api/quizzes', require('./routes/quizRoutes'));
// app.use('/api/chats', require('./routes/chatRoutes'));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Ensure to add .js extension
import authRoutes from './routes/authRoutes.js'; // Ensure to add .js extension
import ideaRoutes from './routes/ideaRoutes.js'; // Ensure to add .js extension
import quizRoutes from './routes/quizRoutes.js'; // Ensure to add .js extension
import chatRoutes from './routes/chatRoutes.js'; // Ensure to add .js extension

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/chats', chatRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));