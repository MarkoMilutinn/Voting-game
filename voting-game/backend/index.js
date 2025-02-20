import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jokeRoutes from "./routes/JokeRoutes.js"; // ✅ Correct import

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", jokeRoutes); // ✅ Make sure to use the correct variable

app.get("/", (req, res) => {
  res.send("Welcome to the Voting Game API!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
