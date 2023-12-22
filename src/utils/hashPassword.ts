import bcrypt from 'bcrypt';
import { CustomError } from './error';
export class HashPassWord {
    private saltRounds: number = 10;
    hashPassword = (password: string): string => {
        return bcrypt.hashSync(password, this.saltRounds);
    };
    checkPassword = (
        myPlaintextPassword: string,
        passwordHash: string
    ): boolean => {
        return bcrypt.compareSync(myPlaintextPassword, passwordHash);
    };
}
