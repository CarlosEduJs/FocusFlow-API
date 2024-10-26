import User from "../../models/userModel.js"

export const userInfor = async (req, res) => {
    const { uid } = req.params;
    try {
        const user = await User.findOne({ uid })
        if (!user) {
            return res.status(404).json({ message: "Este usuario não foi encontrado!" });
        }
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar o usuário', error });
    }
}