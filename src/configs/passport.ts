var GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
import { AuthService } from '../services/auth';
const authService = new AuthService();
export class PassportConfig {
    google = (): any => {   
        return new GoogleStrategy(
            {
                clientID:
                    '213962504751-9er0ipjttdt8e3e6edforu37h7dkeug7.apps.googleusercontent.com',
                clientSecret: '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',
                callbackURL: 'http://localhost:3002/api/auth/google/callback',
            },
            authService.callbackAuthenGoogle
        );
    };
    facebook = (): any => {
        return new FacebookStrategy(
            {
                clientID: '365618279366507',
                clientSecret: 'd8549f9966d2be23539cb380ec68c81c',
                callbackURL: 'http://localhost:3002/auth/facebook/callback',
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
