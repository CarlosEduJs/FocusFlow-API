import User from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
    const { email, password, wordSecret } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "Usuario não encontrado!" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Senha incorreta!" });
        }

        const isWordSecretValid = await bcrypt.compare(wordSecret, user.wordSecret);
        if (!isWordSecretValid) {
            return res.status(401).json({ message: 'Palavra secreta incorreta!' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "4h" })

        return res.status(200).json({ message: 'Login bem-sucedido!', token });
    } catch (error) {
        return res.status(500).json({ message: `Erro no login`, error: error.message });
    }
}