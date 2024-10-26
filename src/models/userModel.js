import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    resetPasswordToken: { type: String },
    resetPasswordTokenExpires: { type: String },
    resetWordSecretToken: { type: String },
    resetWordSecretTokenExpires: { type: String },
    uid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    wordSecret: { type: String, required: false },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    uncategorizedTasks: [{ type: mongoose.Types.ObjectId, ref: 'Task' }],
});

const user = mongoose.model("User", userSchema);
export default user;