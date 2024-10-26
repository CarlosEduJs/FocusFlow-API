import User from "../../../models/userModel.js";
import Task from "../../../models/taskModel.js";
import Category from "../../../models/categoryModel.js"; 

export const deleteTask = async (req, res) => {
    const { uid, taskId } = req.params;

    try {
        
        const user = await User.findOne({ uid });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        
        const task = await Task.findOne({ taskId });
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada!' });
        }

        let taskRemoved = false;

        
        for (const categoryId of user.categories) {
            const category = await Category.findOne({ categoryId }); 
            if (category) {
                const taskIndex = category.tasks.findIndex(t => t.toString() === task._id.toString());
                if (taskIndex !== -1) {
                    category.tasks.splice(taskIndex, 1);  
                    await category.save();  
                    taskRemoved = true;
                    break;
                }
            }
        }

        
        if (!taskRemoved) {
            const taskIndex = user.uncategorizedTasks.findIndex(t => t.toString() === task._id.toString());
            if (taskIndex !== -1) {
                user.uncategorizedTasks.splice(taskIndex, 1);  
                await user.save();  
            } else {
                return res.status(404).json({ message: 'Tarefa não encontrada nas categorias ou em uncategorizedTasks!' });
            }
        }

        
        await Task.findOneAndDelete({ taskId });

        res.status(200).json({ message: 'Tarefa deletada com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        res.status(500).json({ message: 'Erro ao deletar tarefa', error: error.message });
    }
};
