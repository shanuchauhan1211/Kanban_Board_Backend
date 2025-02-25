import express from 'express';
import { createList,deleteList,updateList,getListsByBoard } from '../controllers/list.js';

const router = new express.Router();

router.post("/createList/:boardId",createList);
router.delete("/deleteList/:listId/board/:boardId",deleteList);
router.put("/updateList/:listId",updateList);
router.get("/getAllLists/:boardId",getListsByBoard);


export default router;