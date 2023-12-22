import express from 'express';
import Joi from 'joi';
import { ConnectDatabase } from '../configs/connectDatabase';
import { CategoryController } from '../controllers/category';
import { Validator } from '../utils/validate';
import { Endpoins } from '../constants/endpoins';
import { AuthMiddleware } from '../middlewares/auth';
import { CategoryService } from '../services/category';
const authMiddleware = new AuthMiddleware();
const connectDatabase = new ConnectDatabase();
const conn = connectDatabase.getSequelize();
const validator = new Validator();
const categoryService = new CategoryService(conn);
export const categoryRouter = express.Router();
const categoryController = new CategoryController(
    Joi,
    categoryService,
    validator
);
categoryRouter.post(
    Endpoins.addCategory,
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    categoryController.addCategory
);
categoryRouter.get(Endpoins.allCategories, categoryController.getAllCategories);
categoryRouter.delete(
    Endpoins.deleteCategory,
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    categoryController.deleteCategory
);
categoryRouter.put(
    Endpoins.updateCategory,
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    categoryController.updateCategory
);
categoryRouter.get(
    Endpoins.phoneByIdCategory,
    categoryController.getPhoneByCategory
);
