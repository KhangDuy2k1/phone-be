import { Request, Response } from 'express';
import { SlideService } from '../services/slide';
import { CustomError } from '../utils/error';

export class SlideController {
    private slideService: SlideService;
    constructor(slideService: SlideService) {
        this.slideService = slideService;
    }
    getAllSlice = async (req: Request, res: Response): Promise<any> => {
        try {
            const { statusCode, ...others } =
                await this.slideService.getAllSlice();
            res.status(statusCode).json({
                ...others,
            });
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    addSlide = async (req: Request, res: Response): Promise<any> => {
        const bodySlide: any = req.body;
        try {
            const { statusCode, ...others } =
                await this.slideService.addSlide(bodySlide);
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
