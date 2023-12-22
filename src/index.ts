import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import * as env from 'dotenv';
import morgan from 'morgan';
import { authRouter } from './routes/auth';
env.config();
import { ConnectDatabase } from './configs/connectDatabase';
import { PassportConfig } from './configs/passport';
import { UrlError } from './middlewares/urlError';
import { imageRouter } from './routes/image';
import { phoneRouter } from './routes/phone';
import { categoryRouter } from './routes/category';
import { discountRouter } from './routes/discount';
import { configRouter } from './routes/config';
import { colorRouter } from './routes/color';
import { storageRouter } from './routes/storage';
import { phoneVariant } from './routes/phoneVariant';
import { orderItemRouter } from './routes/orderItem';
import { cartRouter } from './routes/cart';
import { slideRouter } from './routes/slide';
import { orderRouter } from './routes/order';
const passportConfig = new PassportConfig();
const urlError = new UrlError();
export class App {
    app: express.Application;
    port: number | string;
    passport: any;
    constructor() {
        this.passport = passport;
        this.port = process.env.PORT || 8080;
        this.app = express();
        this.configApp();
        this.setUpPassport();
        this.Api();
    }
    private setUpPassport = () => {
        this.passport.use(passportConfig.google());
        this.passport.use(passportConfig.facebook());
    };
    configApp = () => {
        this.app.use(cors());
        this.app.use(
            session({
                secret: 'keyboard cat',
                resave: false,
                saveUninitialized: true,
                cookie: { secure: false },
            })
        );
        this.app.use(morgan('dev'));
        this.app.use(cookieParser());
        this.app.use(express.json());
    };
    Api = () => {
        this.app.use('/api/order', orderRouter);
        this.app.use('/api/slide', slideRouter);
        this.app.use('/api/cart', cartRouter);
        this.app.use('/api/orderItem', orderItemRouter);
        this.app.use('/api/pvariant', phoneVariant);
        this.app.use('/api/storage', storageRouter);
        this.app.use('/api/img', imageRouter);
        this.app.use('/api/config', configRouter);
        this.app.use('/api/color', colorRouter);
        this.app.use('/api/discount', discountRouter);
        this.app.use('/api/category', categoryRouter);
        this.app.use('/api/phone', phoneRouter);
        this.app.use('/api/auth', authRouter);
        this.app.use(urlError.checkUrl);
    };
    runApp = () => {
        this.app.listen(this.port, async () => {
            await new ConnectDatabase().connectDatabase();
            console.log(`server is running on port ${this.port}`);
        });
    };
}
