import { Request, Response } from 'express';
import { ReviewService } from '../services/review';
import { number } from 'joi';
export class ReviewController {
    private reviewService: ReviewService;
    constructor(reviewService: ReviewService) {
        this.reviewService = reviewService;
    }
    public addReview = async (req: Request, res: Response): Promise<void> => {
        const user_id: number = (req as any).user.id;
        const phone_id: any = req.query.id;
        const { star_number } = req.body;
        try {
            const { statusCode, ...others } =
                await this.reviewService.addReview({
                    user_id: user_id,
                    phone_id: parseInt(phone_id),
                    star_number: star_number,
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
}
