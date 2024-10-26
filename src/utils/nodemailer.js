import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

export const sendWordSecretEmail = async (email, wordSecret) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Sua palavra secreta",
            text: `Sua palavra secreta: ${wordSecret}\nGuarde-a com segurança.`
        }
        await transporter.sendMail(mailOptions);
        console.log("palavra enviada!")
    } catch (error) {
        console.log("Erro ao enviar email:", error)
    }
}

export const sendLinkToResetPassword = async (resetToken, email) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Link de redefinição de Senha",
            text: resetToken
        }
        
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Link de redefinição enviado com sucesso!' };
    } catch (error) {
        console.error('Erro ao solicitar redefinição de senha:', error);
        throw new Error('Erro ao solicitar redefinição de senha');
    }
}
export const sendLinkToResetWordSecret = async (resetToken, email) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Link de redefinição de Palavra secreta",
            text: resetToken
        }
        
        await transporter.sendMail(mailOptions);
        return { success: true, message: 'Link de redefinição enviado com sucesso!' };
    } catch (error) {
        console.error('Erro ao solicitar redefinição de palavra secreta:', error);
        throw new Error('Erro ao solicitar redefinição de palavra');
    }
}