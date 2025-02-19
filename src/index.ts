import dotenv from "dotenv";
import express from "express";

import { connectDB } from "./db/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error in MongoDB connection: ${error.message}`);
  });
