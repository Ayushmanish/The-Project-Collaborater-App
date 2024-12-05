import express from 'express';
import {
  getEnrolledProjects,
  getAvailableProjects,
  leaveProject,
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to fetch enrolled projects
router.get('/enrolled', protect, getEnrolledProjects);

// Route to fetch available projects
router.get('/available', protect, getAvailableProjects);

// Route to leave a project
router.post('/:projectId/leave', protect, leaveProject);

export default router;
