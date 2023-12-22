import { Request, Response } from 'express';
import { CartService } from '../services/cart';
import { Validator } from '../utils/validate';
export class CartController {
    private cartService: CartService;
    private validator: Validator;
    private joi: any;
    constructor(cartService: CartService, joi: any, validator: Validator) {
        this.cartService = cartService;
        this.joi = joi;
        this.validator = validator;
    }
    public getOrderItemCart = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        try {
            const { id } = (req as any).user;
            const { statusCode, ...others } =
                await this.cartService.getOrderItemCart(id);
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
