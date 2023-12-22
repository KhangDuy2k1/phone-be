import { IConfig } from '../models/config';
import { Request, Response } from 'express';
import { Validator } from '../utils/validate';
import { ConfigService } from '../services/config';
import { CustomError } from '../utils/error';
export class ConfigController {
    private joi: any;
    private configService: ConfigService;
    private validator: Validator;
    constructor(joi: any, configService: ConfigService, validator: Validator) {
        this.joi = joi;
        this.configService = configService;
        this.validator = validator;
    }
    public addConfig = async (req: Request, res: Response) => {
        const bodyConfig: IConfig = req.body;
        try {
            const bodyConfigRequest = await this.validator.checkRequestBody(
                this.joi,
                {
                    screen: this.joi.string().required(),
                    os: this.joi.string().required(),
                    rear_camera: this.joi.string().required(),
                    front_camera: this.joi.string().required(),
                    chip: this.joi.string().required(),
                    ram: this.joi.number().required(),
                    pin: this.joi.string().required(),
                },
                bodyConfig
            );
            const configResponse =
                await this.configService.addConfig(bodyConfigRequest);
            const { statusCode, ...others } = configResponse;
            return res.status(statusCode).json({
                ...others,
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
    delConfig = async (req: Request, res: Response): Promise<any> => {
        const id: any = req.query.id;
        try {
            const response = await this.configService.delConfig(id);
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
    public updateConfig = async (req: Request, res: Response): Promise<any> => {
        const id: any = req.query.id;
        const bodyConfig = req.body;
        try {
            const response = await this.configService.udpateConfig(
                id,
                bodyConfig
            );
            if (!response) {
                throw new CustomError(404, 'không thể xóa');
            } else {
                return {
                    success: true,
                    message: 'cập nhật thành công',
                };
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw CustomError;
            } else {
                throw new CustomError(500, 'lỗi server');
            }
        }
    };
}
