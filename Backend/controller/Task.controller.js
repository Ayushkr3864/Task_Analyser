
const taskModel = require("../models/task.model")

// get task
const getTask = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        const task = await taskModel.find();
        if (!task) return res.status(400).json({ error: "no task found" })
        res.status(200).json({tasks:task})
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

//create task 
const postTask = async(req, res) => {
    const { title } = req.body;
    try {
          const user = req.user;

          if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
          }
        if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }
      const newTask = {
        id: Date.now(),
        title,
        completed: false,
        };
       const createdTask =  await taskModel.create(newTask)
    res.status(200).json({ task:createdTask });
    } catch (err) {
        res.status(500).json({error:err.message})
   }
}

// update task status
const updateStatus = async (req, res) => {
    const taskId = req.params.id;
    console.log(taskId);
    
    try {
          const user = req.user;

          if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
          }
       const updateTask = await taskModel.findOneAndUpdate(
         { id: taskId },
         { $set: { completed:!updateStatus.completed} },
         { returnDocument: "after" },
        );
        console.log(updateTask);
        
        if (!updateTask) return res.status(400).json({ error: "failed to update task" })
        res.status(200).json({task:updateTask})
    } catch (err) {
        res.status(500).json({eror:err.message})
   }
}
//delete task

const deleteTask = async (req, res) => {
    try {
          const user = req.user;

          if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
          }
      const taskId = req.params.id;
      const deletedTask = await taskModel.findOneAndDelete({ id: taskId });
      if (!deletedTask)
        return res.status(400).json({ error: "unable to delete task" });
      res.status(200).json({ message: "task deleted successfully" });
    } catch (err) {
      res.status(500).json({ eror: err.message });
    }
}
module.exports = {getTask,postTask,updateStatus,deleteTask}