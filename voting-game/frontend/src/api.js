const API_URL = "http://localhost:5000/api/joke";

// Fetch the joke from the backend
export async function fetchJoke() {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) throw new Error("Failed to fetch joke");

    const joke = await response.json();

    if (!joke.jokeId) {
      throw new Error("Joke data is incomplete");
    }

    return joke; // Return the joke from the backend
  } catch (error) {
    console.error("Error fetching joke:", error);
    throw new Error("Failed to fetch joke");
  }
}


// Submit a vote for a joke
export async function voteForJoke(jokeId, emoji) {
  try {
    const response = await fetch(`${API_URL}/${jokeId}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emoji }),
    });

    if (!response.ok) throw new Error("Failed to submit vote");

    const updatedJoke = await response.json();
    return updatedJoke; // Return the updated joke with new vote counts
  } catch (error) {
    console.error("Error submitting vote:", error);
    throw new Error("Failed to submit vote");
  }
}
