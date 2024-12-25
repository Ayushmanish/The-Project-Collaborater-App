import Project from '../models/Idea.js';
import User from '../models/User.js';
import Idea from '../models/Idea.js';
// Fetch enrolled projects
export const getEnrolledProjects = async (req, res) => {
  try {
    let userId = req.user._id;
    // userId = userId.toString();
    console.log(userId)
    const projects = await Idea.find({ collaborators: userId });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching enrolled projects' });
  }
};

// Fetch available projects
export const getAvailableProjects = async (req, res) => {
  try {
    let userId = req.user._id;
    // userId = userId.toString();
    console.log(userId);
    const projects = await Idea.find({ collaborators: {$ne:userId} });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching available projects' });
  }
};

// Leave a project
export const leaveProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    console.log(project)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Remove the user from collaborators
    project.collaborators = project.collaborators.filter((collabId) => collabId.toString() !== userId);
    let slots = project.slots;
    project.slots = slots+1;
    await project.save();

    res.json({ message: 'You have successfully left the project' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while leaving the project' });
  }
};
