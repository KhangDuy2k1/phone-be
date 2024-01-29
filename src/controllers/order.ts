import { Request, Response } from 'express';
import { OrderService } from '../services/order';
import { CustomError } from '../utils/error';
import { Validator } from '../utils/validate';

export class OrderController {
    private orderService: OrderService;
    private joi: any;
    private validator: Validator;
    constructor(orderService: OrderService, joi: any, validator: Validator) {
        this.orderService = orderService;
        this.joi = joi;
        this.validator = validator;
    }
    orderDirectPayment = async (req: Request, res: Response): Promise<any> => {
        const { id } = (req as any).user;
        const bodyOrder = req.body;

        try {
       
            // const bodyOrderChecked = await this.validator.checkRequestBody(
            //     this.joi,
            //     {
            //         id_orders: this.joi.array(this.joi.number()).required(),
            //         total_amount: this.joi.number().required(),
            //         phone_order: this.joi.string().required(),
            //         address_order: this.joi.string().required(),
            //     },
            //     bodyOrder
            // );
            // console.log(bodyOrderChecked);
    
            const { statusCode, ...others } =
                await this.orderService.orderDirectPayment({
                    id_user: id,
                    ...bodyOrder,
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
    public updateInfoOrder = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        const id_order: any = req.query.id;
        const bodyInfo: {
            adress_order: string;
            phone_order: string;
        } = req.body;
        try {
            const bodyOrderChecked = await this.validator.checkRequestBody(
                this.joi,
                {
                    adress_order: this.joi.string().required(),
                    phone_order: this.joi.string().required(),
                },
                bodyInfo
            );
            const { statusCode, ...others } =
                await this.orderService.updateInfoOrder({
                    id_order: id_order,
                    ...bodyOrderChecked,
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
    public cancleOrder = async (req: Request, res: Response): Promise<any> => {
        const id: any = req.query.id;

        try {
            const { statusCode, ...others } =
                await this.orderService.cancleOrder(id);
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
    public getAllOrder = async (req: Request, res: Response): Promise<any> => {
        try {
            const { statusCode, ...others } =
                await this.orderService.getAllOrder();
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
    public detailOrder = async (req: Request, res: Response): Promise<any> => {
        const id: any = req.query.id;
        try {
            const { statusCode, ...others } =
                await this.orderService.detailOrder(id);
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
