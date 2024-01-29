import { Request, Response } from 'express';
import { StorageService } from '../services/storage';
import { IStorage } from '../models/storage';
import { Validator } from '../utils/validate';

export class StorageController {
    private storageService: StorageService;
    private joi: any;
    private validator: Validator;
    constructor(
        storageService: StorageService,
        joi: any,
        validator: Validator
    ) {
        this.storageService = storageService;
        (this.joi = joi), (this.validator = validator);
    }
    public addStorage = async (req: Request, res: Response): Promise<any> => {
        const bodyStore = req.body;
        try {
            const value = await this.validator.checkRequestBody(
                this.joi,
                {
                    memory: this.joi.number().required(),
                },
                bodyStore
            );
            const respones = await this.storageService.addMemory(value);
            const { statusCode, ...others } = respones;
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
    public deleteStorage = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        const id: any = req.query.id;
        try {
            const respones = await this.storageService.deleteMemory(id);
            const { statusCode, ...others } = respones;
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
    public updateStorage = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        const id: any = req.query.id;
        const bodyStorage: IStorage = req.body;
        try {
            const value: any = this.validator.checkRequestBody(
                this.joi,
                {
                    memory: this.joi.number().required(),
                },
                bodyStorage
            );
            const response = await this.storageService.updateMemory(id, value);
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
    public getAllStorage = async(req: Request, res: Response): Promise<any> => {
           try {
                const {statusCode, ...others} = await this.storageService.getAllStorage()
                res.status(statusCode).json(others)
           } catch (error: any) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
           }
    }
}
