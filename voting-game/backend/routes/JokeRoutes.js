import express from "express";
import Joke from "../model/Joke.js"; // MongoDB schema
import axios from "axios";

const router = express.Router();

/**
 * Save a joke to MongoDB if it doesn't exist
 * @param {Object} jokeData - Joke object from the Teehee API
 */
async function saveJokeToDB(jokeData) {
  try {
    // Validate joke data to ensure it has all required fields
    if (!jokeData.id || jokeData.id.trim() === "" || !jokeData.question || !jokeData.answer) {
      console.error("Error: Invalid joke data received:", jokeData);
      return null;
    }

    // Log joke data to make sure jokeId is valid
    console.log("Checking joke data:", jokeData);

    // Check if the joke already exists in MongoDB by jokeId
    let joke = await Joke.findOne({ jokeId: jokeData.id });

    // If joke already exists, log and return it
    if (joke) {
      console.log("🔄 Joke already exists:", joke.jokeId);
      return joke; // Return the existing joke
    }

    // If joke does not exist, create a new one and save it
    joke = new Joke({
      jokeId: jokeData.id, // Ensure jokeId is correctly assigned
      question: jokeData.question,
      answer: jokeData.answer,
      votes: { "😂": 0, "👍": 0, "❤️": 0 },
    });

    // Save the new joke to MongoDB
    await joke.save();
    console.log("✅ Joke saved:", joke.jokeId);
    return joke;
  } catch (error) {
    console.error("Error saving joke to DB:", error);
    return null;
  }
}

// Fetch a joke from Teehee API and store in MongoDB (if new)
// router.get("/joke", async (req, res) => {
//   try {
//     // Fetch joke from Teehee API
//     const { data } = await axios.get("https://teehee.dev/api/joke");

//     // Save the fetched joke to MongoDB
//     const joke = await saveJokeToDB(data);

//     // If saving failed, return a 500 error
//     if (!joke) {
//       return res.status(500).json({ error: "Failed to save joke" });
//     }

//     // Return the joke as JSON
//     res.json(joke);
//   } catch (error) {
//     console.error("Error fetching joke:", error);
//     res.status(500).json({ error: "Failed to fetch joke" });
//   }
// });

// Vote for an emoji on a joke
// Fetch a joke from Teehee API and store in MongoDB (if new)
// Fetch a joke from Teehee API and store in MongoDB (if new)
router.get("/joke", async (req, res) => {
  try {
    console.log("🔍 Fetching joke from Teehee API...");
    const { data } = await axios.get("https://teehee.dev/api/joke");
    console.log("🎉 Fetched joke data:", data);  // Log the fetched data

    if (!data || !data.id || !data.question || !data.answer) {
      console.error("Error: Invalid joke data received from Teehee API", data);
      return res.status(500).json({ error: "Failed to fetch joke from Teehee API" });
    }

    // Save the fetched joke to MongoDB
    const joke = await saveJokeToDB(data);

    if (!joke) {
      console.error("Error saving joke to DB");
      return res.status(500).json({ error: "Failed to save joke to MongoDB" });
    }

    // Return the joke as JSON
    res.json(joke);
  } catch (error) {
    console.error("Error fetching joke:", error);
    res.status(500).json({ error: "Failed to fetch joke" });
  }
});

router.post("/joke/:jokeId/vote", async (req, res) => {
  try {
    const { jokeId } = req.params;
    const { emoji, remove } = req.body;

    // Ensure valid emoji input
    if (!["😂", "👍", "❤️"].includes(emoji)) {
      return res.status(400).json({ error: "Invalid emoji" });
    }

    // Find the joke
    const joke = await Joke.findOne({ jokeId });

    if (!joke) return res.status(404).json({ error: "Joke not found" });

    if (remove) {
      // Decrease vote count but prevent negative values
      joke.votes[emoji] = Math.max(0, joke.votes[emoji] - 1);
    } else {
      // Increase vote count
      joke.votes[emoji]++;
    }

    await joke.save();
    res.json(joke);
  } catch (error) {
    console.error("Error voting:", error);
    res.status(500).json({ error: "Failed to vote" });
  }
});


export default router;

