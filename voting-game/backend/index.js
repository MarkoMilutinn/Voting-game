import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jokeRoutes from "./routes/JokeRoutes.js"; // ✅ Correct import

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", jokeRoutes); // ✅ Ensure correct variable

app.get("/", (req, res) => {
  res.send("Welcome to the Voting Game API!");
});

// 🚀 Connect to MongoDB Atlas and Fix Indexes
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await fixIndexes(); // 🛠 Drop duplicate index if exists
  })
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

async function fixIndexes() {
  try {
    const db = mongoose.connection.db;
    const jokesCollection = db.collection("jokes");

    const indexes = await jokesCollection.indexes();
    console.log("📌 Existing Indexes:", indexes);

    if (indexes.some(index => index.name === "id_1")) {
      console.log("⚠️ Dropping incorrect index: id_1");
      await jokesCollection.dropIndex("id_1");
      console.log("✅ Dropped duplicate id_1 index!");
    } else {
      console.log("🎉 No duplicate id_1 index found.");
    }
  } catch (error) {
    console.error("❌ Error checking/dropping index:", error);
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
