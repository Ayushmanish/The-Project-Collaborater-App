import express from 'express';
const router = express.Router();
import Chat from '../models/Chat.js'; // Ensure to add .js extension

// Route to send a message
router.post('/send', async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const chat = new Chat({ senderId, receiverId, message });
    await chat.save();
    res.status(201).json({ message: 'Message sent successfully!', chat });
  } catch (error) {
    res.status(500).json({ error: 'Error sending message.' });
  }
});

// Route to fetch chat history between two users
router.get('/history/:user1Id/:user2Id', async (req, res) => {
  const { user1Id, user2Id } = req.params;

  try {
    const messages = await Chat.find({
      $or: [
        { senderId: user1Id, receiverId: user2Id },
        { senderId: user2Id, receiverId: user1Id }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching chat history.' });
  }
});

export default router;
