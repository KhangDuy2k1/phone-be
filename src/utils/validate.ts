import validator from 'validator';
import { CustomError } from './error';
export class Validator {
    public isEmailValid = (email: string): boolean => {
        return validator.isEmail(email);
    };
    public checkPassword = (password: string): boolean => {
        return password.length >= 6;
    };
    public checkRequestBody = async (joi: any, checkObject: any, body: any) => {
        const schema = joi.object(checkObject);
        try {
            const value = await schema.validateAsync(body);
            return value;
        } catch (error: any) {
            throw new CustomError(400, error.details[0].message);
        }
    };
}
