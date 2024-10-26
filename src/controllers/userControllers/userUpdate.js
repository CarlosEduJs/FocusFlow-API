import User from "../../models/userModel.js";

export const updateUser = async (req, res) => {
    const { id } = req.params; 
    const { name} = req.body; 

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        if (name) user.name = name;
        
        await user.save();
        res.status(200).json({ message: 'Usuário atualizado com sucesso!', user });
    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar o usuário', error: error.message });
    }
};
