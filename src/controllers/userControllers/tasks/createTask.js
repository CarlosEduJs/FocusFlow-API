import Task from '../../../models/taskModel.js';
import User from '../../../models/userModel.js';
import Category from '../../../models/categoryModel.js'; // Certifique-se de importar o modelo de categoria
import generateUID from '../../../utils/generateUIDs.js';

export const createTask = async (req, res) => {
    const { id } = req.params;
    const { taskName, description, date, hours, categoryId } = req.body;

    try {
        // Buscar o usuário pelo ID e popular as categorias
        const user = await User.findById(id).populate('categories');

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        let categoryName = null;

        // Se houver uma categoria, buscar o nome da categoria
        if (categoryId) {
            const category = await Category.findOne({ categoryId });

            if (!category) {
                return res.status(404).json({ message: 'Categoria não encontrada!' });
            }

            categoryName = category.categoryName; // Obter o nome da categoria
        }

        // Criar uma nova instância da tarefa com o nome da categoria (se houver)
        const newTask = new Task({
            taskName,
            taskId: generateUID(6),
            description,
            date,
            hours,
            completed: false,
            progress: false,
            protect: false,
            category: categoryName // Atribuir o nome da categoria ou null
        });
        
        // Salvar a tarefa no banco de dados
        await newTask.save();

        // Associar a tarefa a uma categoria ou à lista de uncategorizedTasks
        if (categoryId) {
            const category = await Category.findOne({ categoryId });

            // Associar o ID da tarefa à categoria e salvar a categoria
            category.tasks.push(newTask._id);
            await category.save(); // Salvar a atualização na categoria
        } else {
            user.uncategorizedTasks.push(newTask._id);
            await user.save(); // Salvar as alterações no usuário
        }

        // Enviar a resposta com a nova tarefa, incluindo o nome da categoria
        res.status(201).json({ message: 'Tarefa criada com sucesso!', task: newTask });
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        res.status(500).json({ message: 'Erro ao criar tarefa', error: error.message });
    }
};
