import User from "../models/userModel.js";

export const validateToken = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ resetToken: token }); 
    if (!user || user.resetTokenExpires < Date.now()) {
      return res.status(400).json({ message: "Token inválido ou expirado" });
    }
    res.status(200).json({ isValid: true, message: "Token válido" });
  } catch (error) {
    console.error("Erro ao validar token:", error);
    res.status(500).json({ message: "Erro interno ao validar token" });
  }
};
