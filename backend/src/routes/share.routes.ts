import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { share } from "../controllers/share.controller.js";

const router = express.Router();

router.post("/share", authMiddleware, share);

export default router;
