import User from "../../models/userModel.js"

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario não encontrado!" })
        }
        return res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar o usuário', error });
    }
}