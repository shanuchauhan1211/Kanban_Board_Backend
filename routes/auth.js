import express from "express";

import { register,logIn } from "../controllers/auth.js";

const router = new express.Router();

router.post("/register",register);
router.post("/logIn",logIn);

export default router;