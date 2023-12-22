import { Request, Response } from 'express';
import { ImageService } from '../services/image';
import { Validator } from '../utils/validate';
export class ImageController {
    private imageService: ImageService;
    private joi: any;
    private validator: Validator;
    constructor(imageService: ImageService, joi: any, validator: Validator) {
        this.imageService = imageService;
        this.joi = joi;
        this.validator = validator;
    }
    public addImage = async (req: Request, res: Response): Promise<any> => {
        const imageBody: any = req.body;
        try {
            const value = await this.validator.checkRequestBody(
                this.joi,
                {
                    phone_id: this.joi.number().required(),
                    link: this.joi.string().required(),
                },
                imageBody
            );
            const { statusCode, ...others } =
                await this.imageService.addImage(value);
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
    public updateImage = async (req: Request, res: Response): Promise<any> => {
        const id: any = req.query.id;
        const bodyImage = req.body;
        try {
            const response = await this.imageService.updateImage(id, bodyImage);
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
