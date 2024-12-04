// import express from 'express';
// const router = express.Router();
// import Idea from '../models/Idea.js';

// // Route to create a new idea
// router.post('/create', async (req, res) => {
//   const { title, description, techStack, domain, slots, quiz } = req.body;

//   try {
//     const idea = new Idea({ title, description, techStack, domain, slots, quiz });
//     await idea.save();
//     res.status(201).json({ message: 'Idea created successfully!', idea });
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating idea.' });
//   }
// });

// // Route to search for ideas
// router.get('/search', async (req, res) => {
//   const { keyword, domain } = req.query;

//   try {
//     const filter = {};
//     if (keyword) filter.title = new RegExp(keyword, 'i');
//     if (domain) filter.domain = domain;

//     const ideas = await Idea.find(filter);
//     res.status(200).json(ideas);
//   } catch (error) {
//     res.status(500).json({ error: 'Error searching for ideas.' });
//   }
// });

// export default router;


import express from 'express';
import Idea from '../models/Idea.js';
import authMiddleware from '../middleware/auth.js'; // Authentication middleware
const router = express.Router();

// Route to create a new idea
router.post('/create', authMiddleware, async (req, res) => {
  const { title, description, techStack, domain, slots, quiz } = req.body;

  try {
    const uploaderId = req.user.id; // Extracted by the auth middleware
    const idea = new Idea({ title, description, techStack, domain, slots, quiz, uploaderId });
    await idea.save();
    res.status(201).json({ message: 'Idea created successfully!', idea });
  } catch (error) {
    console.error('Error creating idea',error); // Log the error for debugging
    res.status(500).json({ error: 'Error creating idea.' });
  }
});

// Route to search for ideas
router.get('/search', async (req, res) => {
  const { keyword, domain } = req.query;

  try {
    const filter = {};
    if (keyword) filter.title = new RegExp(keyword, 'i');
    if (domain) filter.domain = domain;

    const ideas = await Idea.find(filter);
    res.status(200).json(ideas);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Error searching for ideas.' });
  }
});

export default router;
