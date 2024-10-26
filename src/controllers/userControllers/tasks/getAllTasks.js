import User from "../../../models/userModel.js";
import Category from "../../../models/categoryModel.js";
import Task from "../../../models/taskModel.js";

export const getAllTasks = async (req, res) => {
    const { id } = req.params;
    try {
        // Buscar o usuário e popular as tarefas nas categorias e uncategorizedTasks
        const user = await User.findById(id)
            .populate({
                path: 'categories', 
                populate: { path: 'tasks' } // Popula as tarefas dentro de cada categoria
            })
            .populate('uncategorizedTasks'); // Popula as tarefas sem categoria

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        // Mapeia as tarefas categorizadas, incluindo o nome da categoria
        const categorizedTasks = user.categories.map(category => ({
            category: category.categoryName, // Usa o campo categoryName do novo modelo
            tasks: category.tasks // As tarefas já estarão populadas aqui
        }));

        // As tarefas sem categoria já estão populadas em `uncategorizedTasks`
        const uncategorizedTasks = user.uncategorizedTasks;

        // Enviar a resposta com todas as tarefas
        res.status(200).json({
            categorizedTasks,
            uncategorizedTasks,
        });
    } catch (error) {
        console.error('Erro ao obter tarefas:', error);
        res.status(500).json({ message: 'Erro ao obter tarefas', error: error.message });
    }
};
