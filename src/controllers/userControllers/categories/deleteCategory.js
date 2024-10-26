import User from "../../../models/userModel.js"

export const deleteCategory = async (req, res) => {
    const { uid, categoryId } = req.body;

    try {
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        user.categories = user.categories.filter(cat => cat._id.toString() !== categoryId);
        await user.save();

        res.status(200).json({ message: 'Categoria deletada com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        res.status(500).json({ message: 'Erro ao deletar categoria', error: error.message });
    }
};
