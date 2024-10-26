import express from "express";
import dotenv from "dotenv";

import userRoutes from "./src/routes/userRoutes.js";

import connectDB from './src/db/db.js';

import cors from "cors"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));

connectDB();

app.use(express.json());

app.use('/api', userRoutes);

app.listen(port, () => {
    console.log("Servidor ON!!!");
})