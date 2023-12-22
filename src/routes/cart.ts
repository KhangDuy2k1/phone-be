import express from 'express';
import Joi from 'joi';
import { CartController } from '../controllers/cart';
import { AuthMiddleware } from '../middlewares/auth';
import { CartService } from '../services/cart';
import { Validator } from '../utils/validate';
import { Endpoins } from '../constants/endpoins';
const authMiddleware: AuthMiddleware = new AuthMiddleware();
const validator: Validator = new Validator();
const cartService: CartService = new CartService();
const cartController: CartController = new CartController(
    cartService,
    Joi,
    validator
);
export const cartRouter = express.Router();
cartRouter.get(
    Endpoins.getOrderItemCart,
    authMiddleware.verifyToken,
    cartController.getOrderItemCart
);
