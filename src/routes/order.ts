import exrpess from 'express';
import Joi from 'joi';
import { OrderService } from '../services/order';
import { OrderController } from '../controllers/order';
import { AuthMiddleware } from '../middlewares/auth';
import { Validator } from '../utils/validate';
import { Endpoins } from '../constants/endpoins';
const validator: Validator = new Validator();
const authMiddleware: AuthMiddleware = new AuthMiddleware();
const orderService: OrderService = new OrderService();
const orderController: OrderController = new OrderController(
    orderService,
    Joi,
    validator
);
export const orderRouter = exrpess.Router();
orderRouter.post(
    Endpoins.directOrder,
    authMiddleware.verifyToken,
    orderController.orderDirectPayment
);
orderRouter.patch(Endpoins.updateInfoOrder, orderController.updateInfoOrder);
orderRouter.patch(Endpoins.cancleOrder, orderController.cancleOrder);
