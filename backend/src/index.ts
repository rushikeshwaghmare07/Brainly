import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/index"
import userRoutes from "./routes/auth.routes.js";
import contentRoutes from "./routes/content.routes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/contents", contentRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error in MongoDB connection: ${error.message}`);
  });
