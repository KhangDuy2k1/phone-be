import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { IDecodeToken } from './decodeToken';
import { JWT } from '../utils/jwt';
import { UserModel } from '../models/user';
const jwt = new JWT();
export class AuthMiddleware {
    verifyToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.headers['authorization']) {
                res.status(401).json({
                    success: false,
                    mes: 'token chưa được gửi lên',
                });
            } else if (!req.headers['authorization'].startsWith('Bearer')) {
                res.status(401).json({
                    success: false,
                    mes: 'chưa đúng định dạng gửi lên',
                });
            } else {
                const token = req.headers['authorization'].split(' ')[1];
                const decodeToken: any = jwt.verifyToken(token);
                const user = await UserModel.findOne({
                    where: {
                        id: decodeToken.id,
                    },
                });
                (req as any).user = user?.dataValues;
                next();
            }
        } catch (error: any) {
            res.status(error.statusCode).json({
                success: false,
                mes: error.message,
            });
        }
    };
    isAdmin = (req: Request, res: Response, next: NextFunction) => {
        const role = (req as any).user.role;
        if (role !== 'admin') {
            return res.status(401).json({
                status: false,
                mes: 'bạn không phải admin',
            });
        } else {
            next();
        }
    };
    googleCb = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('google', (err: any, user: any, info: any) => {
            if (err) {
                return res.status(401).json({
                    status: false,
                    error: 'Authentication failed',
                    message: err.message,
                });
            }
            if (!user) {
                return res.status(401).json({
                    status: false,
                    error: 'Authentication failed',
                    message: info.message,
                });
            }
            return res.status(200).json({
                status: true,
                mes: 'đăng nhập thành công',
                token: jwt.generateToken({ id: user.id }),
                user: user,
            });
            // return res.redirect(`/api/auth/success/${user.token}`);
        })(req, res, next);
    };
    facebookCb = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('facebook', (err: any, user: any, info: any) => {
            if (err) {
                return res.status(401).json({
                    status: false,
                    error: 'Authentication failed',
                    message: err.message,
                });
            }
            if (!user) {
                return res.status(401).json({
                    status: false,
                    error: 'Authentication failed',
                    message: info.message,
                });
            }
        })(req, res, next);
    };
}
