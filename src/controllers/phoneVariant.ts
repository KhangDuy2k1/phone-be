import { Request, Response } from 'express';
import { PhoneVariantService } from '../services/phoneVariant';
import { Validator } from '../utils/validate';
export class PhoneVariantController {
    private phoneVariantService: PhoneVariantService;
    private joi: any;
    private validator: Validator;
    constructor(
        joi: any,
        phoneVariantService: PhoneVariantService,
        validator: Validator
    ) {
        this.joi = joi;
        this.phoneVariantService = phoneVariantService;
        this.validator = validator;
    }
    public addPhoneVariant = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        const bodyPhoneVariant: any = req.body;
        try {
            const value = await this.validator.checkRequestBody(
                this.joi,
                {
                    phone_id: this.joi.number().required(),
                    color_id: this.joi.number().required(),
                    storage_id: this.joi.number().required(),
                },
                bodyPhoneVariant
            );
            const { statusCode, ...others } =
                await this.phoneVariantService.addPhoneVariant(value);
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
