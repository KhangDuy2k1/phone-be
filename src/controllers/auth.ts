import { Request, Response } from 'express';
import { IUser } from '../models/user';
import { AuthService } from '../services/auth';
export class AuthController {
    protected authServive: AuthService;
    constructor(authService: AuthService) {
        this.authServive = authService;
    }
    register = async (req: Request, res: Response): Promise<any> => {
        const infoUser: IUser = req.body;
        try {
            const response = await this.authServive.register(infoUser);
            return res.status(201).json({
                success: true,
                mes: response.message,
                user: response.userRegisted,
            });
        } catch (error: any) {
            switch (error.message) {
                case 'không được để trống':
                    res.status(error.statusCode).json({
                        success: false,
                        mes: error.message,
                    });
                    break;
                case 'email đã được đăng kí bởi 1 tài khoản khác':
                    res.status(error.statusCode).json({
                        success: false,
                        mes: error.message,
                    });
                    break;
                case 'lỗi server':
                    res.status(error.statusCode).json({
                        success: false,
                        mes: error.message,
                    });
                    break;
                case 'password phải tối thiểu 6 kí tự':
                    res.status(error.statusCode).json({
                        success: false,
                        mes: error.message,
                    });
                    break;
                case 'email không hợp lệ':
                    res.status(error.statusCode).json({
                        success: false,
                        mes: error.message,
                    });
                    break;
                case 'username đã tồn tại':
                    res.status(error.statusCode).json({
                        success: false,
                        mes: error.message,
                    });
                    break;
            }
        }
    };
    login = async (req: Request, res: Response): Promise<any> => {
        const infoUserLogin: {
            username: string;
            password: string;
        } = req.body;

        try {
            const { statusCode, ...others } =
                await this.authServive.login(infoUserLogin);
            return res.status(statusCode).json(others);
        } catch (error: any) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
        }
    };
    sendOtpForgetPassword = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        const email: any = req.query.email;
        try {
            const response = await this.authServive.sendOtp(email);
            return res.status(response.statusCode).json({
                status: true,
                mes: response.mes,
            });
        } catch (error: any) {
            switch (error.message) {
                case 'email không được để trống và phải đúng định dạng':
                    res.status(error.statusCode).json({
                        status: false,
                        mes: error.message,
                    });
                    break;
                case 'email chưa được đăng kí':
                    res.status(error.statusCode).json({
                        status: false,
                        mes: error.message,
                    });
                    break;
                default:
                    res.status(500).json({
                        status: false,
                        mes: 'lỗi server',
                    });
            }
        }
    };
    checkOtpForgetPassword = async (req: Request, res: Response) => {
        const otp: string = req.body.otp;
        try {
            const response = await this.authServive.checkOtp(otp);

            return res.status(200).json({
                ...response,
            });
        } catch (error: any) {
            res.status(error.statusCode).json({
                status: false,
                message: error.message
            })
        }
    };
    changePassword = async (req: Request, res: Response) => {
        const { username } = req.user as any;
        try {
            const response = await this.authServive.changePassword({
                username: username,
                ...req.body,
            });
            return res.status(response.statusCode).json({
                mes: response.mes,
            });
        } catch (error: any) {
            switch (error.message) {
                case 'không tồn tại người dùng':
                    res.status(error.statusCode).json({
                        status: false,
                        mes: error.message,
                    });
                    break;
                case 'mật khẩu nhập lại sai':
                    res.status(error.statusCode).json({
                        status: false,
                        mes: error.message,
                    });
                    break;
                case 'sai mật khẩu cũ':
                    res.status(error.statusCode).json({
                        status: false,
                        mes: error.message,
                    });
                    break;
                default:
                    res.status(error.statusCode).json({
                        status: false,
                        mes: 'lỗi server',
                    });
            }
        }
    };
    public passwordUpdateForget = async(req: Request, res: Response): Promise<any> => { 
        const {email, password, newPassword} = req.body
        try {
            const {statusCode, ...others} = await this.authServive.passwordUpdateForgot({email, password, newPassword})
            res.status(statusCode).json({
                ...others
            })
        } catch (error: any) {
            res.status(error.statusCode).json({
                status: false,
                message: error.message
            })
        }
    }
}
