import { Request, Response } from 'express';
import { IPhone } from '../models/phone';
import { Validator } from '../utils/validate';
import { PhoneService } from '../services/phone';
import { CustomError } from '../utils/error';
export class PhoneController {
    private joi: any;
    private phoneService: PhoneService;
    private validator: Validator;
    constructor(joi: any, phoneService: PhoneService, validator: Validator) {
        this.joi = joi;
        this.phoneService = phoneService;
        this.validator = validator;
    }
    public addPhone = async (req: Request, res: Response): Promise<any> => {
        let phone: IPhone = req.body;
        try {
            const phoneRequest = await this.validator.checkRequestBody(
                this.joi,
                {
                    name: this.joi.string().required(),
                    discount_id: this.joi.number().required(),
                    category_id: this.joi.number().required(),
                    config_id: this.joi.number().required(),
                    inventory_number: this.joi.number().required(),
                    avatar: this.joi.string().required(),
                    desc: this.joi.string().required(),
                    price: this.joi.number().required(),
                },
                phone
            );
            const response = await this.phoneService.addPhone(phoneRequest);
            const { statusCode, ...others } = response;
            res.status(statusCode).json({
                success: true,
                ...others,
            });
        } catch (error: any) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }
    };
    public phones = async (req: Request, res: Response): Promise<any> => {
        try {
            const response = await this.phoneService.getAllPhones();
            const { statusCode, ...other } = response;
            res.status(statusCode).json({
                ...other,
            });
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message,
                });
            }
        }
    };
    public phoneDetail = async (req: Request, res: Response): Promise<any> => {
        const id: any = req.query.id;
        try {
            const response = await this.phoneService.phoneDetail(id);
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
    public addPhoneToWarehouse = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        const id: any = req.query.id;
        const number_phone: number = req.body.number_phone;
        try {
            const { statusCode, ...others } =
                await this.phoneService.addPhoneToWarehouse(id, number_phone);
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
    public listPhonesMassiveDiscount = async(req: Request, res: Response): Promise<any> => {
            try {
                const {statusCode, ...others} = await this.phoneService.listPhonesMassiveDiscount()
                res.status(statusCode).json({
                    ...others
                })
            } catch (error:any) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
            }
    }
    getColorAndStorageById =async(req: Request, res: Response): Promise<any> => {   
        const id = parseInt(req.params.id)
            try {
                const result = await this.phoneService.getColorAndStorageById(id)
                res.status(200).json(result)
            } catch (error:any) {
                res.status(error.statusCode).json({
                    message: error.message
                })
            }
    }
}
