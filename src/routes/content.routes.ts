import express from "express";
import { addContent, getContent } from "../controllers/content.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware , addContent);
router.get("/", authMiddleware , getContent);

export default router;
