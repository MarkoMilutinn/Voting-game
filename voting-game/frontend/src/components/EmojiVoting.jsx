import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { voteForJoke } from "../api"; // ✅ Import API function

function EmojiVoting({ jokeId }) {
  const [votes, setVotes] = useState({ "😂": 0, "👍": 0, "❤️": 0 });
  const [userVotes, setUserVotes] = useState({ "😂": false, "👍": false, "❤️": false });

  // ✅ Fetch votes from backend when joke changes
  useEffect(() => {
    async function fetchVotes() {
      try {
        const response = await fetch('http://localhost:5000/api/joke/${jokeId}');
        if (!response.ok) throw new Error("Failed to fetch votes");
        const jokeData = await response.json();
        
        setVotes(jokeData.votes || { "😂": 0, "👍": 0, "❤️": 0 }); // ✅ Update votes
        setUserVotes({ "😂": false, "👍": false, "❤️": false }); // ✅ Reset user votes
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    }
    if (jokeId) fetchVotes();
  }, [jokeId]);

  // ✅ Handle vote submission
  const handleVote = async (emoji) => {
    try {
      const updatedJoke = await voteForJoke(jokeId, emoji); // ✅ Send vote to backend
      setVotes(updatedJoke.votes); // ✅ Update UI with new vote count
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  return (
    <div>
      {["😂", "👍", "❤️"].map((emoji) => (
        <button
          key={emoji}
          onClick={() => handleVote(emoji)}
          style={{
            fontSize: "24px",
            padding: "8px",
            margin: "5px",
            backgroundColor: userVotes[emoji] ? "#ffcc00" : "#eee",
            border: "1px solid black",
            borderRadius: "5px",
          }}
        >
          {emoji} {votes[emoji] || 0} {/* ✅ Display real votes */}
        </button>
      ))}
    </div>
  );
}

EmojiVoting.propTypes = {
  jokeId: PropTypes.string.isRequired,
};

export default EmojiVoting;