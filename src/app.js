import cors from "cors";
import express from "express";

const app = express();
// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: "Access-Control-Allow-Credentials: true",
  })
);

export { app };
