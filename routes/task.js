import express from 'express';
import { createTask, deleteTask, moveTask } from '../controllers/task';


const router = new express.Router();


router.post("/createTask/:listId",createTask);
router.delete("/deleteTask/:taskId",deleteTask);
router.put("/moveTask/list/:newlistId/task/:taskId",moveTask);