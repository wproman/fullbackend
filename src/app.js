import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:
    "Access-Control-Allow-Credentials: true",
    // use(cookieParser());
    // "Access-Control-Allow-Origin: http://localhost:5173",
    // "Access-Control-Allow-Headers: Content-Type, Authorization",
    // "Access-Control-Allow-Methods: GET, POST, PUT, DELETE",
    // "Access-Control-Allow-Credentials: true",
    // "Access-Control-Max-Age: 86400",
    // "Access-Control-Expose-Headers: Content-Length, Content-Range",
  })

























export { app };
