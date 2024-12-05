import express from 'express';
import Room from '../models/Room.js';

const router = express.Router();

// Create or fetch a room
router.post('/room', async (req, res) => {
  const { roomId } = req.body;

  try {
    let room = await Room.findOne({ roomId });
    if (!room) {
      room = new Room({ roomId });
      await room.save();
    }
    res.status(200).json(room);
  } catch (error) {
    console.error('Error fetching or creating room:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Save room data (e.g., code updates)
router.put('/room/:roomId', async (req, res) => {
  const { roomId } = req.params;
  const { code } = req.body;

  try {
    const room = await Room.findOneAndUpdate(
      { roomId },
      { code },
      { new: true }
    );
    res.status(200).json(room);
  } catch (error) {
    console.error('Error saving room data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch room chat history
router.get('/room/:roomId/chat', async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.status(200).json(room.chatHistory);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Save a chat message
router.post('/room/:roomId/chat', async (req, res) => {
  const { roomId } = req.params;
  const { username, message } = req.body;

  try {
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ error: 'Room not found' });

    room.chatHistory.push({ username, message });
    await room.save();

    res.status(200).json({ message: 'Message saved', chatHistory: room.chatHistory });
  } catch (error) {
    console.error('Error saving chat message:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
