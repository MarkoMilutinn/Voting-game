// import  { useState, useEffect } from "react";
// import { fetchJoke } from "../api"; // API call for fetching joke
// import EmojiVoting from "./EmojiVoting"; // Voting component

// function JokeDisplay() {
//   const [joke, setJoke] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch joke from the backend
//   useEffect(() => {
//     async function loadJoke() {
//       try {
//         const joke = await fetchJoke(); // This calls your backend API
//         setJoke(joke);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch joke");
//         setLoading(false);
//       }
//     }
//     loadJoke();
//   }, []);

//   // Handle error display
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h2>{joke.question}</h2>
//       <p>{joke.answer}</p>
//       <EmojiVoting jokeId={joke.jokeId} />
//     </div>
//   );
// }

// export default JokeDisplay;


import  { useState, useEffect } from 'react';
import EmojiVoting from './EmojiVoting'; // Emoji voting component

function JokeDisplay() {
  const [joke, setJoke] = useState(null); // Holds the joke data
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [error, setError] = useState(null); // Tracks error state

  // Function to fetch a new joke
  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://teehee.dev/api/joke');
      if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
      
      const data = await response.json();
      console.log("Fetched joke data:", data); // For debugging
      
      // Check if joke data has both question and answer
      if (data.question && data.answer) {
        setJoke(data); // Set the joke
      } else {
        throw new Error('Invalid joke format');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a joke when the component mounts
  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {joke && (
        <div>
          <p><strong>{joke.question}</strong></p>
          <p>{joke.answer}</p>
          <EmojiVoting jokeId={joke.id} /> {/* Voting buttons for this joke */}
        </div>
      )}
      <button onClick={fetchJoke}>Next Joke</button>
    </div>
  );
}

export default JokeDisplay;
