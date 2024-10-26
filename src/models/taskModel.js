import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    taskId: { type: String, unique: true },
    description: { type: String },
    date: { type: String, required: true },
    hours: { type: String, required: true },
    completed: { type: Boolean, default: false },
    progress: { type: Boolean, default: false },
    protect: { type: Boolean, default: false },
    category: { type: String },
});

const Task = mongoose.model("Task", taskSchema)
export default Task;