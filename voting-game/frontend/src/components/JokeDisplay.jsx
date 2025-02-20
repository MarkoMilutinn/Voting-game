import { useState, useEffect } from "react";
import { fetchJoke } from "../api"; // ✅ Import API function
import EmojiVoting from "./EmojiVoting"; // ✅ Import voting component

function JokeDisplay() {
  const [joke, setJoke] = useState(null); // Holds the joke data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Tracks error state

  // Fetch joke from backend
  useEffect(() => {
    async function loadJoke() {
      try {
        const fetchedJoke = await fetchJoke(); // ✅ Fetch from backend
        setJoke(fetchedJoke);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch joke");
      } finally {
        setLoading(false);
      }
    }
    loadJoke();
  }, []);

  // Handle UI states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {joke && (
        <div>
          <p><strong>{joke.question}</strong></p>
          <p>{joke.answer}</p>
          <EmojiVoting jokeId={joke.jokeId} /> {/* ✅ Pass correct jokeId */}
        </div>
      )}
      <button onClick={() => window.location.reload()}>Next Joke</button> {/* Refresh for new joke */}
    </div>
  );
}

export default JokeDisplay;
