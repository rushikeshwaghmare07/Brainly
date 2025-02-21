import express from "express";
import { userSignin, userSignup } from "../controllers/user.controller";

const router = express.Router();

router.post("/signup", userSignup);
router.post("/signin", userSignin);

export default router;
