import User from "../../../models/userModel.js"

export const updateCategory = async (req, res) => {
    const { uid, categoryId } = req.params;
    const { newName } = req.body;

    try {
        const user = await User.findOne({ uid }).populate('categories');
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        const category = user.categories.find(cat => cat.categoryId === categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Categoria não encontrada!' });
        }

        category.categoryName = newName;
        await user.save();

        res.status(200).json({ message: 'Categoria atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        res.status(500).json({ message: 'Erro ao atualizar categoria', error: error.message });
    }
};
