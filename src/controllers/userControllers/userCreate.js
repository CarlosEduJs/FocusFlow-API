import User from "../../models/userModel.js";
import { sendWordSecretEmail } from "../../utils/nodemailer.js";
import generateUID from "../../utils/generateUIDs.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    const { name, email, password, wordSecret } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Este usuario já existe" })
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const hashWordSecret = await bcrypt.hash(wordSecret, 10);

        const newUser = await User({
            uid: generateUID(),
            name,
            email,
            password: hashedPass,
            wordSecret: hashWordSecret,
            categories: [],
        });

        await newUser.save();
        await sendWordSecretEmail(email, wordSecret);
        return res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
    } catch (error) {

    }
}