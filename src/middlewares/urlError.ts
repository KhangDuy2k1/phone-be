import { Request, Response } from 'express';
export class UrlError {
    static checkUrl = (req: Request, res: Response) => {
        res.status(404).json({
            mes: 'url Error',
        });
    };
}
