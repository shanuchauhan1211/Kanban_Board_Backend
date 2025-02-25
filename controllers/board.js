import Board from "../model/board.js";
import List from "../model/list.js";
import Task from "../model/task.js";

export const createBoard = async(req,res)=>{

    // if (!req.user) {
    //     return res.status(401).json({ message: "Unauthorized" });
    //   }
  

    const {title} = req.body;
    const {userId} = req.params;

    try {
        // const newBoard = await Board.create({title,req.user.id});   apply with middelware
 const newBoard = await Board.create({title,userId}) ;
 return res.status(201).json({message:"Board is created",Board:newBoard});

        
    } catch (error) {
        console.error("Error creating board:", error);
        return res.status(500).json({ message: "Internal Server Error" });
        
    }

}


export const getAllBoard = async(req,res) =>{

const{userId}= req.params;
try {
const boards = await Board.find({userId:userId}); // req.user.id
res.status(200).json({boards}); 
    
} catch (error) {
    res.status(500).json({ error: err.message });
    
}


}

export const deleteBoard = async(req,res)=>{

const{boardId} = req.params;
try{

    const board = await Board.findById(boardId);
    if(!board)
    {
        res.status(404).json({message:"invalid Board Id"});
    }

const lists = await List.find({boardId});

const listIds = lists.map((list)=>{ list._id});
 await Task.deleteMany({listId:{$in:listIds}});

 await List.deleteMany({boardId});

await Board.findByIdAndDelete(boardId)

const updatedBoards= await Board.find();

    res.status(200).json({message:"Board is deleted", boards:updatedBoards});


}catch(error)
{
    console.error("Error deleting board:", error);
    res.status(500).json({ message: "Internal Server Error" });

}

}