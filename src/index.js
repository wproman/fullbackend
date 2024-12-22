// import dotenv from "dotenv";
//i donot need because of "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
//It automatically loads environment variables from your .env file without requiring explicit import dotenv from 'dotenv'; or dotenv.config() in your code.
import { app } from "./app.js";
import connectDB from "./db/index.js";

// Load environment variables from .env file
// dotenv.config({
//   path: "./env",
// });

(async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log("Database connected successfully");

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error during startup:", error);
    process.exit(1); // Exit the process on failure
  }
})();