import express, {Application} from 'express';
import http, { Server } from 'http';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import morgan from 'morgan';
import { authRouter } from './routes/auth';
import { initSocket } from '../socket';
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
import { reviewRouter } from './routes/review';
import { commentRouter } from './routes/comment';
import { userRouter } from './routes/user';
export class App {
    private app: Application;
    private server: Server;
    private port: number | string;
    private passport: any;
    constructor(port: number | string) {
        this.passport = passport;
        this.port = port;
        this.app = express();
        this.server = http.createServer(this.app);
        this.configApp();
        this.setUpPassport();
        this.Api();
    }
    private setUpPassport = () => {
        this.passport.use(PassportConfig.google())
        this.passport.use(PassportConfig.facebook())
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
        this.app.use('/api/comment', commentRouter);
        this.app.use('/api/review', reviewRouter);
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
        this.app.use('/api/user', userRouter)
        this.app.use(UrlError.checkUrl);
    };
    runApp = () => {
        this.server.listen(this.port, async () => {
            await new ConnectDatabase().connectDatabase();
            initSocket(this.server);
            console.log(`server is running on port ${this.port}`);
        });
        this.server.setTimeout(5000);
    };
}
