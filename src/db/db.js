import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    console.log(process.env.MONGODB_URI);
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("conectado ao mongo!");
    } catch (error) {
        console.error("Erro na conexão" + error.message);
        process.exit(1);
    }
}

export default connectDB;