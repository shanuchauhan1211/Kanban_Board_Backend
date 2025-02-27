import express from 'express';
import { createTask, deleteTask, moveTask ,updateTask} from '../controllers/task.js';


const router = new express.Router();


router.post("/createTask/:listId",createTask);
router.delete("/deleteTask/:taskId",deleteTask);
router.put("/moveTask/list/:newlistId/task/:taskId",moveTask);
router.put("/updateTask/:taskId",updateTask);

export default router;