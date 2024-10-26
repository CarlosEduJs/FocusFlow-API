import Category from "../../../models/categoryModel.js";
import User from "../../../models/userModel.js";

import generateUID from "../../../utils/generateUIDs.js";

export const categoryCreate = async (req, res) => {
    const { id } = req.params;
    const { categoryName } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        const categoryId = generateUID(6);
        const newCategory = new Category({ categoryId, categoryName: categoryName, tasks: [] });
        await newCategory.save();  

        // Adicione a referência da categoria no usuário
        user.categories.push(newCategory._id);
        await user.save();

        res.status(201).json({ message: `Categoria criada com sucesso! ${categoryId}`, category: newCategory });
    } catch (error) {
        console.error('Erro ao criar categoria:', error);
        res.status(500).json({ message: 'Erro ao criar categoria', error: error.message });
    }
}
