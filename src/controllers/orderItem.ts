import { Request, Response } from 'express';
import { OrderItemService } from '../services/orderItem';
import { Validator } from '../utils/validate';
export class OrderItemController {
    private orderItemService: OrderItemService;
    private joi: any;
    private validator: Validator;
    constructor(
        orderItemService: OrderItemService,
        joi: any,
        validator: Validator
    ) {
        (this.orderItemService = orderItemService),
            (this.joi = joi),
            (this.validator = validator);
    }
    public addOrderItemtoCart = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        try {
            const { id } = (req as any).user;
            const bodyOrderItem: {
                phone_id: number;
                storage_id: number;
                color_id: number;
                quantity: number;
            } = req.body;
            console.log(bodyOrderItem);
            const orderItem = await this.validator.checkRequestBody(
                this.joi,
                {
                    phone_id: this.joi.number().required(),
                    storage_id: this.joi.number().required(),
                    color_id: this.joi.number().required(),
                    quantity: this.joi.number().required(),
                },
                {
                    ...bodyOrderItem,
                }
            );
            const { statusCode, ...others } =
                await this.orderItemService.addOrderItemtoCart({
                    id,
                    ...orderItem,
                });
            res.status(statusCode).json({
                ...others,
            });
        } catch (error: any) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }
    };
    public bestSellingPhone = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        try {
            const { statusCode, ...others } =
                await this.orderItemService.bestSellingPhone();
            res.status(statusCode).json({
                ...others,
            });
        } catch (error: any) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }
    };
}
