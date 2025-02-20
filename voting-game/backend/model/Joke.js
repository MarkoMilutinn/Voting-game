import mongoose from 'mongoose';

const jokeSchema = new mongoose.Schema({
  jokeId: { 
    type: String, 
    required: true, 
    unique: true,  // This ensures that no two jokes can have the same jokeId
  },
  question: String,
  answer: String,
  votes: { 
    "😂": { type: Number, default: 0 },
    "👍": { type: Number, default: 0 },
    "❤️": { type: Number, default: 0 },
  }
});

const Joke = mongoose.model('Joke', jokeSchema);
export default Joke;
