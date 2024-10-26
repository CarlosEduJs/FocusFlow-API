import User from "../../../models/userModel.js";
import Task from "../../../models/taskModel.js";

export const taskInfo = async (req, res) => {
    const { uid, taskId } = req.params;

    try {
        const user = await User.findOne({ uid });
        if (!user) {
            return res.status(404).json({ message: "Usuario não encontrado" })
        }
        
        const task = await Task.findOne({ taskId });
        if (!task) {
            return res.status(404).json({ message: "Tarefa não encontrada!" });
        }
        
        const taskArray = [{
            taskId: task.taskId,
            taskName: task.taskName,
            description: task.description,
            date: task.date,
            hours: task.hours,
            completed: task.completed,
            progress: task.progress,
            category: task.category,
        }];

        return res.status(200).json({ task: taskArray });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar a tarefa', error: error.message });
    }
};
