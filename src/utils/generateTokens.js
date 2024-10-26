import jwt from "jsonwebtoken";

export const generateToken = (id) => {
    const secret = process.env.JWT_SECRET;
    return jwt.sign({ id: id }, secret, { expiresIn: "1h" });
}