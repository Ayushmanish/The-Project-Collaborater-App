import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  ideaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea', required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [String],
      correctOption: { type: Number, required: true },
    },
  ],
});

// Use default export
const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz; // Export the User model as default
