import mongoose from 'mongoose';

const jokeSchema = new mongoose.Schema({
  jokeId: { 
    type: String, 
    required: [true, "jokeId is required"], 
    unique: true,  
    index: true,  
  },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  votes: { 
    "😂": { type: Number, default: 0 },
    "👍": { type: Number, default: 0 },
    "❤️": { type: Number, default: 0 },
  }
});

const Joke = mongoose.model('Joke', jokeSchema);
export default Joke;
