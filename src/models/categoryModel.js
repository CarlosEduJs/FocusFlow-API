import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryId: { type: String, required: true, unique: true },
    categoryName: { type: String, required: true },
    tasks: [{ type: mongoose.Types.ObjectId, ref: 'Task' }]
});

const Category = new mongoose.model("Category", categorySchema);
export default Category;