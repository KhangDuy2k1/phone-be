import { Request, Response } from 'express';
import { CommentService } from '../services/comment';
import { Validator } from '../utils/validate';
export class CommentController {
    private commentService: CommentService;
    private joi: any;
    private validator: Validator;
    constructor(
        commentService: CommentService,
        joi: any,
        validator: Validator
    ) {
        this.commentService = commentService;
        this.joi = joi;
        this.validator = validator;
    }
    addComment = async (req: Request, res: Response): Promise<any> => {
        const userInfo = (req as any).user;
        const bodyComment = req.body;
        try {
            const value = this.validator.checkRequestBody(
                this.joi,
                {
                    text: this.joi.string().required(),
                    phone_id: this.joi.number().required(),
                    parent_id: this.joi.number(),
                },
                bodyComment
            );
            const { statusCode, ...others } =
                await this.commentService.addComment(bodyComment, userInfo);
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
    allComment = async (req: Request, res: Response): Promise<any> => {
        try {
            const response = await this.commentService.allComment();
        } catch (error) {}
    };
}
