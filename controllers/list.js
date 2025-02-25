import List from "../model/list.js"
import Task from "../model/task.js"




export const createList = async(req,res)=>{
const{boardId}= req.params;
const{title}= req.body;
try{
if (!title || !boardId) {
    return res.status(400).json({ message: "Title and Board ID are required" });
  }

  const newList = await List.create({ title, boardId });
  res.status(201).json({ message: "List created successfully", list: newList });
} catch (error) {
  console.error("Error creating list:", error);
  res.status(500).json({ message: "Internal Server Error" });
}
}



export const updateList = async (req, res) => {
    try {
      const { listId } = req.params;
      const { title } = req.body;
  
      const updatedList = await List.findByIdAndUpdate(
        listId,
        { title },
        { new: true } 
      );
  
      if (!updatedList) {
        return res.status(404).json({ message: "List not found" });
      }
  
      res.status(200).json({ message: "List updated successfully", list: updatedList });
    } catch (error) {
      console.error("Error updating list:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  export const deleteList = async (req, res) => {
    try {
      const { listId, boardId } = req.params;
      await Task.deleteMany({ listId });
  
      
      const deletedList = await List.findByIdAndDelete(listId);
const updatedList  = await List.find({boardId});
  
      if (!deletedList) {
        return res.status(404).json({ message: "List not found", list: updatedList });
      }
  
      res.status(200).json({ message: "List and its tasks deleted successfully", list: updatedList  });
    } catch (error) {
      console.error("Error deleting list:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


  export const getListsByBoard = async (req, res) => {
    try {
      const { boardId } = req.params;
      const lists = await List.find({ boardId });
  
      res.status(200).json(lists);
    } catch (error) {
      console.error("Error fetching lists:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };