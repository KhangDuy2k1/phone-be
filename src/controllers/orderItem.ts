import { Request, Response } from 'express';
import { OrderItemService } from '../services/orderItem';
import { Validator } from '../utils/validate';
import { CustomError } from '../utils/error';
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
    public deleteOrderItem = async(req: Request, res: Response):Promise<any> => {
        const id_order_item = req.params.id
        try {
            const {statusCode, others} = await this.orderItemService.deleteOrderItem(parseInt(id_order_item))
           res.status(statusCode).json({
            ...others
           })
        } catch (error:any) {
           res.status(error.statusCode).json({
            message: error.message
           })
        }
    }
    public updateQuantity = async(req: Request, res: Response): Promise<any> => 
      
    { 
        const id_item = req.params.id;
        const quantity = req.body.quantity;
        console.log(id_item, quantity)
        try {
            const {statusCode, ...others}  = await this.orderItemService.updateQuantity(parseInt(id_item), quantity)
            res.status(statusCode).json({
                ...others
            })
        } catch (error: any) {
            res.status(error.statusCode).json({
                message: error.message
            })
        }
      
    }
}
