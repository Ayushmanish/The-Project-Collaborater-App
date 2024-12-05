import express from 'express';
import Idea from '../models/Idea.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Authentication middleware
const router = express.Router();

// Route to create a new idea (Uploader role only)
router.post('/create', authMiddleware, async (req, res) => {
  const { title, description, techStack, domain, slots, quiz } = req.body;

  try {
    const uploaderId = req.user.id; 
    const uploaderName = req.user.username;
    const idea = new Idea({ title, description, techStack, domain, slots, quiz, uploaderId,uploaderName });
    await idea.save();
    res.status(201).json({ message: 'Idea created successfully!', idea });
  } catch (error) {
    console.error('Error creating idea', error); // Log the error for debugging
    res.status(500).json({ error: 'Error creating idea.' });
  }
});

// Route to search for ideas (Collaborator role)
router.get('/search', async (req, res) => {
  const { keyword, domain } = req.query;

  try {
    const filter = {};
    if (keyword) filter.title = new RegExp(keyword, 'i'); // Case-insensitive search
    if (domain) filter.domain = domain;

    // Populate uploaderId to include the username and email
    const ideas = await Idea.find(filter).populate('uploaderId', 'username email');
    res.status(200).json(ideas);
  } catch (error) {
    console.error('Error searching for ideas', error); // Log the error for debugging
    res.status(500).json({ error: 'Error searching for ideas.' });
  }
});

// Route to fetch a single idea's details
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Populate uploaderId and collaborators with username and email
    const idea = await Idea.findById(id)
      .populate('uploaderId', 'username email')  // Populate uploaderId with username and email
      .populate('collaborators', 'username email');  // Populate collaborators with username and email

    if (!idea) return res.status(404).json({ error: 'Idea not found.' });

    res.status(200).json(idea);
  } catch (error) {
    console.error('Error fetching idea details', error); // Log the error for debugging
    res.status(500).json({ error: 'Error fetching idea details.' });
  }
});

// Route to enroll in an idea (Collaborator role)
router.post('/:id/enroll', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const idea = await Idea.findById(id);
    if (!idea) return res.status(404).json({ error: 'Idea not found.' });

    // Ensure the user is not already enrolled
    if (idea.collaborators.includes(req.user.id)) {
      return res.status(400).json({ error: 'You are already enrolled in this idea.' });
    }

    // Add user to collaborators
    idea.collaborators.push(req.user.id);
    await idea.save();

    // Populate collaborators with username and email
    const updatedIdea = await Idea.findById(id).populate('collaborators', 'username email');

    res.status(200).json({ message: 'Enrolled successfully!', idea: updatedIdea });
  } catch (error) {
    console.error('Error enrolling in idea', error); // Log the error for debugging
    res.status(500).json({ error: 'Error enrolling in idea.' });
  }
});

export default router;
