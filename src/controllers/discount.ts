import { IDiscount } from '../models/discount';
import { Request, Response } from 'express';
import { DiscountService } from '../services/discount';
import { Validator } from '../utils/validate';
import { CustomError } from '../utils/error';
export class DiscountController {
    private joi: any;
    private discountService: DiscountService;
    private validator: Validator;
    constructor(
        joi: any,
        discountService: DiscountService,
        validator: Validator
    ) {
        this.joi = joi;
        this.discountService = discountService;
        this.validator = validator;
    }
    getAllDiscount = async (req: Request, res: Response): Promise<any> => {
        try {
            const response = await this.discountService.getAllDiscount();
            const { statusCode, ...others } = response;
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
    addDiscount = async (req: Request, res: Response): Promise<any> => {
        const body: IDiscount = req.body;
        try {
            const bodyDiscount = await this.validator.checkRequestBody(
                this.joi,
                {
                    scale: this.joi.number().required(),
                },
                body
            );
            const response =
                await this.discountService.addDiscount(bodyDiscount);
            const { statusCode, ...other } = response;
            res.status(statusCode).json({
                ...other,
            });
        } catch (error: any) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }
    };
    deleteDiscount = async (req: Request, res: Response): Promise<any> => {
        const id: any = req.query.id;
        try {
            const response = await this.discountService.deleteDiscount(id);
            let { statusCode, ...others } = response;
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
    udpateDiscount = async (req: Request, res: Response): Promise<any> => {
        const id: any = req.query.id;
        const bodyDiscount: { scale: number } = req.body;
        try {
            const value = await this.validator.checkRequestBody(
                this.joi,
                {
                    scale: this.joi.number().required(),
                },
                bodyDiscount
            );
            const response = await this.discountService.updateDiscount(
                id,
                value
            );
            const { statusCode, ...others } = response;
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
