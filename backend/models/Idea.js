import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: { type: [String], required: true },
  domain: { type: String, required: true },
  slots: { type: Number, required: true },
  quiz: { type: String, default: null },
  uploaderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uploaderName:{type:String},
  collaborators: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] }, // New field
}, { timestamps: true });

const Idea = mongoose.model('Idea', ideaSchema);
export default Idea;
