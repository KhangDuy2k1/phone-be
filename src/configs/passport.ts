var GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
import { AuthService } from '../services/auth';
const authService = new AuthService();
export class PassportConfig {
    static google = (): any => {   
        return new GoogleStrategy(
            {
                clientID: process.env.CLIENT_ID_GG,
                clientSecret: process.env.CLIENT_SECRET,
                callbackURL: process.env.CALLBACK_URL_GG,
            },
            authService.callbackAuthenGoogle
        );
    };
    static facebook = (): any => {
        return new FacebookStrategy(
            {
                clientID: process.env.CLIENT_ID_FB,
                clientSecret: process.env.CLIENT_SECRET_FB,
                callbackURL: process.env.CALLBACK_URL_FB,
                profileFields: ['id', 'displayName', 'photos', 'email'],
            },
            function (
                accessToken: any,
                refreshToken: any,
                profile: any,
                cb: any
            ) {
                // console.log(profile);
            }
        );
    };
}
