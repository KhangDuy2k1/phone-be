import express from 'express';
import Joi from 'joi';
import { AuthMiddleware } from '../middlewares/auth';
import { ConnectDatabase } from '../configs/connectDatabase';
import { CommentService } from '../services/comment';
import { CommentController } from '../controllers/comment';
import { Validator } from '../utils/validate';
const sequelize: any = new ConnectDatabase().getSequelize();
const validator: Validator = new Validator();
const authMiddleware: AuthMiddleware = new AuthMiddleware();
const commentService: CommentService = new CommentService(sequelize);
const commentController: CommentController = new CommentController(
    commentService,
    Joi,
    validator
);
export const commentRouter = express.Router();
commentRouter.post(
    '/add',
    authMiddleware.verifyToken,
    commentController.addComment
);
commentRouter.get(
    '/comments',
    // authMiddleware.verifyToken,
    commentController.allComment
);
