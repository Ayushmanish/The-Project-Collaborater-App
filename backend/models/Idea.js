import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [String],
  domain: { type: String, required: true },
  slots: { type: Number, required: true },
  uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: String }, // Optional field for quiz URL
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Idea = mongoose.model('Idea', ideaSchema);
export default Idea;
