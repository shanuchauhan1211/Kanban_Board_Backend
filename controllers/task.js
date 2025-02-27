import Task from "../model/task.js";


export const createTask = async (req, res) => {
    const { listId } = req.params;
    const { title, description, duedate, priority } = req.body;

    try {
        if (!title || !listId) {
            return res.status(400).json({ message: "Title and List ID are required" });
        }

        const newTask = await Task.create({ title, description, duedate, priority, listId });

        return res.status(201).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteTask = async(req,res)=>{

    const{taskId}= req.params;

    try {
        const deletedtask = await Task.findByIdAndDelete(taskId);
        if(!deletedtask)
        {
            res.status(400).json({message:"Invalid TaskId"});
        }

        const updatedLists = await Task.find()

        res.status(200).json({ message: "Task deleted successfully", task: updatedLists });

        

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



export const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const {priority } = req.body;
console.log(taskId,priority);
    try {
        if (!taskId || !priority) {
            return res.status(400).json({ message: "priority and task ID are required" });
        }

        const updatedtask = await Task.findByIdAndUpdate( taskId,
            { priority },
            { new: true } );

        return res.status(201).json({ message: "Task created successfully", task: updatedtask });
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
