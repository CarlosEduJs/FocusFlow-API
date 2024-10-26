import User from "../../../models/userModel.js";
import Task from "../../../models/taskModel.js";
import Category from "../../../models/categoryModel.js";

export const updateTask = async (req, res) => {
    const { uid, taskId } = req.params;
    const { updatedTaskData, newCategoryId } = req.body;  // Dados atualizados e nova categoria (se houver)

    try {
        // Encontrar o usuário
        const user = await User.findOne({ uid }).populate('categories.tasks');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        // Buscar a tarefa no banco de dados diretamente
        const task = await Task.findOne({ taskId });
        if (!task) {
            return res.status(404).json({ message: 'Tarefa não encontrada!' });
        }

        // Atualizar os dados da tarefa
        Object.assign(task, updatedTaskData);

        // Se houver mudança de categoria
        if (newCategoryId) {
            // Buscar a nova categoria diretamente no banco de dados
            const newCategory = await Category.findOne({ categoryId: newCategoryId });
            if (!newCategory) {
                return res.status(404).json({ message: 'Nova categoria não encontrada!' });
            }

            // Atualizar o campo da categoria da tarefa
            task.category = newCategoryId;

            // Adicionar a tarefa à nova categoria
            newCategory.tasks.push(task);  // Associar a tarefa à nova categoria
            await newCategory.save();      // Salvar a nova categoria
        }

        // Salvar o usuário com as alterações na tarefa e nas categorias
        await user.save();
        await task.save();  // Salvar também as alterações na própria tarefa

        res.status(200).json({ message: 'Tarefa atualizada com sucesso!', task: task });
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        res.status(500).json({ message: 'Erro ao atualizar tarefa', error: error.message });
    }
};
