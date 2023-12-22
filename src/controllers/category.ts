import { Request, Response } from 'express';
import { ICategory } from '../models/category';
import { CategoryService } from '../services/category';
import { Validator } from '../utils/validate';
import { CustomError } from '../utils/error';
export class CategoryController {
    private joi: any;
    private categoryService: CategoryService;
    private validator: Validator;
    constructor(
        joi: any,
        categoryServive: CategoryService,
        validator: Validator
    ) {
        this.joi = joi;
        this.categoryService = categoryServive;
        this.validator = validator;
    }
    public addCategory = async (req: Request, res: Response): Promise<any> => {
        const category: ICategory = req.body;
        try {
            const value = await this.validator.checkRequestBody(
                this.joi,
                { name: this.joi.string().required() },
                category
            );
            const respones = await this.categoryService.addCategory(value);
            res.status(201).json({
                ...respones,
            });
        } catch (error: any) {
            if (error instanceof CustomError) {
                res.status(400).json({
                    success: false,
                    mes: error.message,
                });
            }
        }
    };
    public getAllCategories = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.status(200).json({
                ...categories,
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
    public getPhoneByCategory = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        const id: any = req.query.id;
        try {
            const respones = await this.categoryService.getPhoneByCategory(id);
            const { statusCode, ...others } = respones;
            res.status(respones.statusCode).json({
                ...others,
            });
        } catch (error: any) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }
    };
    public deleteCategory = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        const id: any = req.query.id;
        try {
            const response = await this.categoryService.deleteCategory(id);
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
    public updateCategory = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        const id: any = req.query.id;
        const body: { name: string } = req.body;
        try {
            const value = await this.validator.checkRequestBody(
                this.joi,
                {
                    name: this.joi.string().required(),
                },
                body
            );
            const response = await this.categoryService.updateCategory(
                id,
                value
            );
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
