import express from 'express';
import Joi from 'joi';
import { OrderItemService } from '../services/orderItem';
import { OrderItemController } from '../controllers/orderItem';
import { ConnectDatabase } from '../configs/connectDatabase';
import { Validator } from '../utils/validate';
import { AuthMiddleware } from '../middlewares/auth';
import { Endpoins } from '../constants/endpoins';
const sequelize: any = new ConnectDatabase().getSequelize();
const authMidleware = new AuthMiddleware();
const orderItemService: OrderItemService = new OrderItemService(sequelize);
const validator: Validator = new Validator();
const orderItemController = new OrderItemController(
    orderItemService,
    Joi,
    validator
);
export const orderItemRouter = express.Router();
orderItemRouter.post(
    Endpoins.addOrderItemtoCart,
    authMidleware.verifyToken,
    orderItemController.addOrderItemtoCart
);
orderItemRouter.get(
    Endpoins.bestSellingPhone,
    orderItemController.bestSellingPhone
);
