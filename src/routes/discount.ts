import express from 'express';
import Joi from 'joi';
import { AuthMiddleware } from '../middlewares/auth';
import { DiscountController } from '../controllers/discount';
import { DiscountService } from '../services/discount';
import { Endpoins } from '../constants/endpoins';
import { Validator } from '../utils/validate';
const validator = new Validator();
const discountService = new DiscountService();
const authMiddleware = new AuthMiddleware();
const discountController = new DiscountController(
    Joi,
    discountService,
    validator
);
export const discountRouter = express.Router();
discountRouter.get(Endpoins.getAlldiscount, discountController.getAllDiscount);
discountRouter.post(
    Endpoins.addDiscount,
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    discountController.addDiscount
);
discountRouter.delete(
    Endpoins.deleteDiscount,
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    discountController.deleteDiscount
);
discountRouter.put(Endpoins.updateDisCount, discountController.udpateDiscount);
