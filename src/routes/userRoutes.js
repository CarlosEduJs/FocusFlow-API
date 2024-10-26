import express from "express";
const router = express.Router();

//importando controllers - User
import { createUser } from "../controllers/userControllers/userCreate.js";
import { loginUser } from "../controllers/userControllers/userLogin.js"

import { userInfor } from "../controllers/userControllers/userInfors.js"

import { deleteUser } from "../controllers/userControllers/userDelete.js";

import { updateUser } from "../controllers/userControllers/userUpdate.js";
import { resetPassword } from "../controllers/userControllers/resetPassword.js";
import { resetWordSecret } from "../controllers/userControllers/resetWordSecret.js";

import { requestPasswordReset } from "../controllers/userControllers/sendLinkResetPassword.js"
import { requestWordSecretReset } from "../controllers/userControllers/sendLinkResetWordSecret.js"

//importando controllers - Categorias

import { categoryCreate } from "../controllers/userControllers/categories/categoryCreate.js";
import { categoryInfor } from "../controllers/userControllers/categories/categoryInfo.js";
import { updateCategory } from "../controllers/userControllers/categories/updateCategory.js";
import { categoriesGetAll } from "../controllers/userControllers/categories/categoryGetAll.js";

//importando controllers - Tasks

import { createTask } from "../controllers/userControllers/tasks/createTask.js";
import { updateTask } from "../controllers/userControllers/tasks/updateTasks.js";
import { getAllTasks } from "../controllers/userControllers/tasks/getAllTasks.js";
import { taskInfo } from "../controllers/userControllers/tasks/taskInfo.js";
import { deleteTask } from "../controllers/userControllers/tasks/deleteTask.js"

//definindo rotas- User
router.post("/registerUser", createUser);
router.post("/login", loginUser);

router.post("/sendLinkToResetPassword", requestPasswordReset)
router.post("/sendLinkToResetWordSecret", requestWordSecretReset)

router.delete("/:id", deleteUser);

router.get("/:uid", userInfor);

router.put("/updateUser/:id", updateUser);
router.put("/updateUser/:id/resetPassord/:token", resetPassword);
router.put("/updateUser/:id/resetWordSecret/:token", resetWordSecret);

//definindo rotas- Categorias
router.post("/:id/categories", categoryCreate);

router.get("/:uid/categories/:categoryId", categoryInfor);
router.get("/:id/categories", categoriesGetAll);

router.put("/:uid/categories/:categoryId", updateCategory);

//definindo rotas- Tasks
router.post("/:id/tasks", createTask);
router.get("/:id/tasks", getAllTasks);
router.get("/tasks/:taskId", taskInfo);
router.delete("/:uid/tasks/:taskId", deleteTask);
router.put("/:uid/tasks/:taskId", updateTask);

export default router;