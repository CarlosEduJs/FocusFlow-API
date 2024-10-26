import User from '../../models/userModel.js';
import crypto from 'crypto';

import { sendLinkToResetPassword } from '../../utils/nodemailer.js';

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        // Gera o token de redefinição e define a expiração
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpires = Date.now() + 3600000; // 1 hora

        await user.save();

        // Cria o link de redefinição
        const resetLink = `http://localhost:5173/ConfirmPassword/${resetToken}`;

        // Envia o e-mail com o link de redefinição
        await sendLinkToResetPassword(resetLink, email);

        res.status(200).json({ message: "Link de redefinição enviado com sucesso!" });
    } catch (error) {
        console.error('Erro ao solicitar redefinição de senha:', error);
        res.status(500).json({ message: 'Erro ao solicitar redefinição de senha', error: error.message });
    }
};
