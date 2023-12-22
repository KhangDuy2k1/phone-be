import { Request, Response } from 'express';
import { ColorService } from '../services/color';
import { Validator } from '../utils/validate';
export class ColorController {
    private colorService: ColorService;
    private joi: any;
    private validator: Validator;
    constructor(colorService: ColorService, joi: any, validator: Validator) {
        this.colorService = colorService;
        this.joi = joi;
        this.validator = validator;
    }
    public addColor = async (req: Request, res: Response): Promise<any> => {
        const color: any = req.body;
        try {
            const value = await this.validator.checkRequestBody(
                this.joi,
                {
                    name: this.joi.string().required(),
                },
                color
            );
            const response = await this.colorService.addColor(value);
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
    public deleteColor = async (req: Request, res: Response): Promise<any> => {
        const id: any = req.query.id;
        try {
            const response = await this.colorService.deleteColor(id);
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
    public updateColor = async (req: Request, res: Response): Promise<any> => {
        const id: any = req.query.id;
        const bodyColor = req.body;
        try {
            const response = await this.colorService.updateColor(id, bodyColor);
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
}
