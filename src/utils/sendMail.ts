import nodemailer from 'nodemailer';
import { CustomError } from './error';
import { Redis } from '../configs/redis';

export class SendMail {
    // redis?: any;
    client: any;
    transporter: any;
    constructor() {
        this.client = new Redis();
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nguyenkhangbn8501@gmail.com',
                pass: 'cqqb njgx kpkz vzfd',
            },
        });
    }
    generateOtp = (): number => {
        const min: number = 100000;
        const max: number = 999999;
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    checkOtp = async (otp: string): Promise<boolean> => {
        try {
            const otpResponse: string = await this.client.getValue('otp');
            return otpResponse === otp;
        } catch (error) {
            throw new CustomError(500, 'Lỗi server');
        }
    };

    sendMail = async (toEmail: string): Promise<void> => {
        let mailOption = {
            from: process.env.EMAIL,
            to: toEmail,
            subject: 'otp',
            text: this.generateOtp().toString(),
        };
        try {
            await this.client.setValueRedis('otp', mailOption.text);
            const res = await this.transporter.sendMail(mailOption);
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError(500, 'lỗi server');
        }
    };
}
