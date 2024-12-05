import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true }, // Room ID
  code: { type: String, default: '' },                   // Code in the editor
  chatHistory: [
    {
      username: { type: String },
      message: { type: String },
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
