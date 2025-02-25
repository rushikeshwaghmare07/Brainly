import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { share, shareLink } from "../controllers/share.controller.js";

const router = express.Router();

router.post("/share", authMiddleware, share);
router.get("/:shareLink", shareLink);

export default router;
