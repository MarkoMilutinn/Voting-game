import { connect, Schema, model } from 'mongoose';

// Connect to MongoDB (replace 'your_mongodb_connection_string' with your actual MongoDB connection string)
connect('mongodb+srv://markomilutindjudo:SARAjeBeba1@cluster0.vyn23.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');

    // Define the Joke schema (optional, just for consistency if you plan to use the schema)
    const jokeSchema = new Schema({
      id: { type: String, unique: true },
      question: String,
      answer: String,
      emojiVotes: {
        "😂": { type: Number, default: 0 },
        "👍": { type: Number, default: 0 },
        "❤️": { type: Number, default: 0 }
      }
    });

    // Create the Joke model (optional, just for consistency)
    const Joke = model('Joke', jokeSchema);

    // Delete all jokes in the collection
    Joke.deleteMany({})
      .then(() => {
        console.log('All jokes deleted successfully.');
        process.exit(); // Close the connection once done
      })
      .catch((err) => {
        console.error('Error deleting jokes:', err);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
