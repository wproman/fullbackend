// import dotenv from "dotenv";
//i donot need because of "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
//It automatically loads environment variables from your .env file without requiring explicit import dotenv from 'dotenv'; or dotenv.config() in your code.
import connectDB from "./db/index.js";

// Load environment variables from .env file
// dotenv.config({
//   path: "./env",
// });

connectDB();
console.log("first");
