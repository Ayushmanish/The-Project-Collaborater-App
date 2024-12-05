import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http'; // Required to set up Socket.IO with Express
import { Server } from 'socket.io'; // Import Socket.IO
import connectDB from './config/db.js'; // Ensure to add .js extension
import authRoutes from './routes/authRoutes.js'; // Ensure to add .js extension
import ideaRoutes from './routes/ideaRoutes.js'; // Ensure to add .js extension
import quizRoutes from './routes/quizRoutes.js'; // Ensure to add .js extension
import chatRoutes from './routes/chatRoutes.js'; // Ensure to add .js extension
import projectRoutes from './routes/projectRoutes.js';
import roomRoutes from './routes/roomRoutes.js'; // Add the new roomRoutes for collaboration room

dotenv.config();

const app = express();
const httpServer = createServer(app); // Create an HTTP server for Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Update with your frontend's URL in production
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// Add this line to register the project routes
app.use('/api/projects', projectRoutes);

// Database connection
connectDB();

// Socket.IO setup for real-time collaboration
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Event for joining a collaboration room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  // Event for real-time code updates
  socket.on('codeUpdate', ({ roomId, code }) => {
    socket.to(roomId).emit('codeUpdate', code); // Broadcast the code to all users in the room
  });

  // Event for real-time chat messages
  socket.on('chatMessage', ({ roomId, message }) => {
    socket.to(roomId).emit('chatMessage', message); // Broadcast the message to the room
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/rooms', roomRoutes); // Add the collaboration room routes

// Start the server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
