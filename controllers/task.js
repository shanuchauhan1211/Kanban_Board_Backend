import Task from "../model/task";


export const createTask = async(req,res)=>{
    const{listId}= req.params;
    const{title,description,duedate,priority} = req.body;

    try {
if(!title || !listId)
{
    res.status(400).json({message:"Title and Board ID are required"});

    const newTask = await Task.create({title,description,duedate,priority,listId});

    res.status(200).json({message:"Task created Successfully", task:newTask});
}

    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const deleteTask = async(req,res)=>{

    const{taskId}= req.params;

    try {
        const deletedtask = await Task.findByIdAndDelete(taskId);
        if(!deletedtask)
        {
            res.status(400).json({message:"Invalid TaskId"});
        }

        const updatedLists = await List.find().populate("tasks");

        res.status(200).json({ message: "Task deleted successfully", lists: updatedLists });

        

    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}


export const moveTask = async(req,res)=>{
    try{
    const{newlistId,taskId} = req.params;

const updatedTask = await Task.findByIdAndUpdate(taskId,{
    listId:newlistId
},
{new:true});

if(!updatedTask)
{
    res.staus(404).json({message:"Task now found"});
}

const updatedLists = await List.find().populate("tasks");

res.status(200).json({ message: "Task moved successfully", lists: updatedLists });

    }catch(error)
    {
        console.error("Error moving task:", error);
        res.status(500).json({ message: "Internal Server Error" });

    }

    
}