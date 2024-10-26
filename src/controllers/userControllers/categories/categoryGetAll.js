import mongoose from "mongoose";
import User from "../../../models/userModel.js";

export const categoriesGetAll = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const user = await User.findById(id).populate('categories');
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        return res.json({ categories: user.categories });
    } catch (error) {
        console.error('Erro ao obter categorias:', error);
        res.status(500).json({ message: 'Erro ao obter categorias', error: error.message });
    }
}