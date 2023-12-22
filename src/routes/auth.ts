import express from 'express';
import { Endpoins } from '../constants/endpoins';
import { AuthService } from '../services/auth';
import { AuthController } from '../controllers/auth';
import { AuthMiddleware } from '../middlewares/auth';
import passport from 'passport';
const authService = new AuthService();
const authMiddleware = new AuthMiddleware();
const authController = new AuthController(authService);
export const authRouter = express.Router();
authRouter.post(Endpoins.regiter, authController.register);
authRouter.post(Endpoins.login, authController.login);
authRouter.get(Endpoins.sendOtp, authController.sendOtpForgetPassword);
authRouter.get(Endpoins.checkOtp, authController.checkOtpForgetPassword);
authRouter.post(
    Endpoins.changePassword,
    authMiddleware.verifyToken,
    authController.changePassword
);
authRouter.get(
    Endpoins.logGoogle,
    passport.authenticate('google', { scope: ['email'], session: false })
);
authRouter.get(
    Endpoins.logFacebook,
    passport.authenticate('facebook', {
        scope: ['user_friends', 'manage_pages'],
    })
);
authRouter.get(Endpoins.googleCb, authMiddleware.googleCb);
authRouter.get(Endpoins.facebookCb, authMiddleware.facebookCb);
