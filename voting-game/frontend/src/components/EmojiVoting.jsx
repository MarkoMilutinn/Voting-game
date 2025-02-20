import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function EmojiVoting({ jokeId }) {
  const [votes, setVotes] = useState({ "😂": 0, "👍": 0, "❤️": 0 });
  const [userVotes, setUserVotes] = useState({ "😂": false, "👍": false, "❤️": false });

  useEffect(() => {
    // Reset votes when the joke changes
    setVotes({ "😂": 0, "👍": 0, "❤️": 0 });
    setUserVotes({ "😂": false, "👍": false, "❤️": false });
  }, [jokeId]);

  const handleVote = (emoji) => {
    const isRemovingVote = userVotes[emoji]; // Check if user is removing vote
    const change = isRemovingVote ? -1 : 1; // +1 if voting, -1 if removing

    // Update votes and toggle user selection
    setVotes((prevVotes) => ({ ...prevVotes, [emoji]: Math.max(0, prevVotes[emoji] + change) }));
    setUserVotes((prevUserVotes) => ({ ...prevUserVotes, [emoji]: !isRemovingVote }));
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
          {emoji} {votes[emoji]}
        </button>
      ))}
    </div>
  );
}

EmojiVoting.propTypes = {
  jokeId: PropTypes.string.isRequired,
};

export default EmojiVoting;
