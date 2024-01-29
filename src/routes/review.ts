import express from 'express';
import { AuthMiddleware } from '../middlewares/auth';
import { ConnectDatabase } from '../configs/connectDatabase';
import { ReviewService } from '../services/review';
import { ReviewController } from '../controllers/review';
import { Endpoins } from '../constants/endpoins';
const sequelize: any = new ConnectDatabase().getSequelize();
const authMiddleware: AuthMiddleware = new AuthMiddleware();
const reviewService: ReviewService = new ReviewService(sequelize);
const reviewController: ReviewController = new ReviewController(reviewService);
export const reviewRouter = express.Router();
reviewRouter.post(
    Endpoins.addReview,
    authMiddleware.verifyToken,
    reviewController.addReview
);
reviewRouter.get(
    Endpoins.reviewInfo,
    reviewController.reviewInfo
)
