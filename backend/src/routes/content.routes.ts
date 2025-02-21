import express from "express";
import {
  addContent,
  deleteContent,
  getContent,
} from "../controllers/content.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, addContent);
router.get("/", authMiddleware, getContent);
router.delete("/:contentId", authMiddleware, deleteContent);

export default router;
