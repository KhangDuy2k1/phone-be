import exrpess from 'express';
import Joi from 'joi';
import { OrderService } from '../services/order';
import { ConnectDatabase } from '../configs/connectDatabase';
import { OrderController } from '../controllers/order';
import { AuthMiddleware } from '../middlewares/auth';
import { Validator } from '../utils/validate';
import { Endpoins } from '../constants/endpoins';
const sequelize = new ConnectDatabase().getSequelize();
const validator: Validator = new Validator();
const authMiddleware: AuthMiddleware = new AuthMiddleware();
const orderService: OrderService = new OrderService(sequelize);
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
orderRouter.get(Endpoins.allOrders, orderController.getAllOrder);
orderRouter.get(Endpoins.detailOrder, orderController.detailOrder);
