import express from "express";
import { UserController } from "../controllers/user";
import { UserService } from "../services/user";
import { AuthMiddleware } from "../middlewares/auth";
import { Endpoins } from "../constants/endpoins";
const authMiddleware:AuthMiddleware = new AuthMiddleware()
export const userRouter = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

userRouter.get(
    Endpoins.getUserLogin,
    authMiddleware.verifyToken,
    userController.getUserById
)