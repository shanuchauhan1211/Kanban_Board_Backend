import express from "express";
import { getAllBoard,createBoard,deleteBoard } from "../controllers/board.js";
const router = new express.Router();

router.post("/createBoard/:userId",createBoard);
router.get("/getBoard/:userId",getAllBoard);
router.delete("/deleteBoard/:boardId",deleteBoard);

export default router;