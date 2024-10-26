import User from "../../../models/userModel.js";
import Category from "../../../models/categoryModel.js";

export const categoryInfor = async (req, res) => {
    const { uid, categoryId } = req.params;

    try {

        const user = await User.findOne({ uid }).populate('categories');
        if (!user) {
            return res.status(404).json({ message: "Este usuário não foi encontrado!" });
        }

        const category = await Category.findOne({ categoryId }).populate('tasks');
        if (!category) {
            return res.status(404).json({ message: "Categoria não encontrada!" });
        }

        const tasksArray = category.tasks.map(task => ({
            taskId: task.taskId,
            taskName: task.taskName,
            description: task.description,
            date: task.date,
            hours: task.hours,
            completed: task.completed,
            progress: task.progress
        }));

        return res.status(200).json({ categoryName: category.categoryName, tasks: tasksArray });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar a categoria', error: error.message });
    }
};
