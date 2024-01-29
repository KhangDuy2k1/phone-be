import { IUserLogin } from '../models/user';
import { IUser } from '../models/user';
import { UserModel } from '../models/user';
import { CustomError } from '../utils/error';
import { HashPassWord } from '../utils/hashPassword';
import { Validator } from '../utils/validate';
import { Mail } from '../utils/mail';
import { JWT } from '../utils/jwt';
const jwt = new JWT();
const mail = new Mail();
const validator = new Validator();
const hashPassword = new HashPassWord();
export class AuthService {
    protected checkUsernameExist = async (
        username: string
    ): Promise<boolean> => {
        try {
            const usernameCheck: IUser | null = await UserModel.findOne({
                where: {
                    username: username,
                },
            });
            return !!usernameCheck;
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    protected checkEmailExist = async (email: string): Promise<boolean> => {
        try {
            const emailCheck: IUser | null = await UserModel.findOne({
                where: {
                    email: email,
                },
            });
            return !!emailCheck;
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    protected saveUser = async (infoUser: IUser): Promise<IUser> => {
        try {
            const userRegister = await UserModel.create({ ...infoUser });
            return userRegister;
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    register = async (infoUser: IUser): Promise<any> => {
        try {
            if (!(infoUser.email && infoUser.password && infoUser.username)) {
                throw new CustomError(400, 'không được để trống');
            } else if (!validator.isEmailValid(infoUser.email)) {
                throw new CustomError(422, 'email không hợp lệ');
            } else if (!validator.checkPassword(infoUser.password)) {
                throw new CustomError(422, 'password phải tối thiểu 6 kí tự');
            } else {
                const [checkEmailExist, checkUserNameExist] = await Promise.all(
                    [
                        this.checkEmailExist(infoUser.email),
                        this.checkUsernameExist(infoUser.username),
                    ]
                );
                if (checkEmailExist) {
                    throw new CustomError(
                        409,
                        'email đã được đăng kí bởi 1 tài khoản khác'
                    );
                } else if (checkUserNameExist) {
                    throw new CustomError(409, 'username đã tồn tại');
                } else {
                    const { password, birthDay, ...others } = infoUser;
                    const newInfoUser = {
                        password: hashPassword.hashPassword(password),
                        ...others,
                        birthDay: new Date(infoUser.birthDay),
                    };
                    const newUser = new UserModel(newInfoUser);
                    await newUser.save();
                    return {
                        success: true,
                        mes: 'đăng kí tài khoản thành công',
                        userRegisted: newUser,
                    };
                }
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, 'lỗi server');
            }
        }
    };
    public login = async (infoUserLogin: IUserLogin): Promise<any> => {
        try {
            if (!infoUserLogin.username || !infoUserLogin.password) {
                throw new CustomError(400, 'vui lòng nhập đầy đủ thông tin');
            } else {
                const response: any = await UserModel.findOne({
                    where: {
                        username: infoUserLogin.username,
                    },
                });

                if (!response) {
                    throw new CustomError(404, 'sai username');
                } else if (
                    !hashPassword.checkPassword(
                        infoUserLogin.password,
                        response.password
                    )
                ) {
                    throw new CustomError(404, 'sai mật khẩu');
                } else {
                    const accessToken: string = jwt.generateToken({
                        id: response.id,
                    });
                    // console.log(accessToken);
                    const { password, ...other } = response.dataValues;
                    return {
                        success: true,
                        statusCode: 200,
                        message: 'đăng nhập thành công',
                        accessToken: accessToken,
                        user: { ...other },
                    };
                }
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, 'lỗi server');
            }
        }
    };
    callbackAuthenGoogle = async (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
    ) => {
        try {
            const user = await UserModel.findOne({
                where: {
                    googleID: profile.id,
                },
            });

            if (user) {
                return done(null, {
                    user: user,
                    token: jwt.generateToken({ id: user.id }),
                });
            } else {
                const newUser: any = await this.saveUser({
                    facebookID: '',
                    googleID: profile.id,
                    username: '',
                    email: profile.emails[0].value,
                    password: '',
                    phonenumber: '',
                    gender: '',
                    birthDay: new Date('08-05-2001'),
                    address: '',
                });
                return done(null, {
                    user: newUser,
                    token: jwt.generateToken({ id: newUser.id }),
                });
            }
        } catch (error) {
            return done(error, null);
        }
    };
    sendOtp = async (toEmail: string): Promise<any> => {
        try {
            if (!toEmail && !validator.isEmailValid(toEmail)) {
                throw new CustomError(
                    400,
                    'email không được để trống và phải đúng định dạng'
                );
            } else {
                const response = await UserModel.findOne({
                    where: {
                        email: toEmail,
                    },
                });
                if (!response) {
                    throw new CustomError(400, 'email chưa được đăng kí');
                } else {
                    await mail.sendMail(toEmail);
                    return {
                        statusCode: 200,
                        mes: 'gửi otp thành công',
                    };
                }
            }
        } catch (error) {
            console.error(error);
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, 'lối server');
            }
        }
    };
    checkOtp = async (otp: string) => {
        try {
            const response = await mail.checkOtp(otp);
            if (!response) {
                throw new CustomError(401, 'mã xác thực không hợp lệ');
            } else {
                return {
                    status: true,
                    mes: 'xác thực otp thành công',
                };
            }
        } catch (error) {
            if(error instanceof CustomError){
                throw error;
            }else {
                throw new CustomError(500, "lỗi server")
            }
           
        }
    };
    changePassword = async (passwordDetail: {
        username: string;
        oldPassword: string;
        newPassword: string;
        rePassword: string;
    }) => {
        try {
            const respones = await UserModel.findOne({
                where: {
                    username: passwordDetail.username,
                },
            });
            if (!respones) {
                throw new CustomError(400, 'không tồn tại người dùng');
            } else {
                const responesCheck = hashPassword.checkPassword(
                    passwordDetail.oldPassword,
                    respones.dataValues.password
                );
                if (responesCheck) {
                    if (
                        passwordDetail.newPassword === passwordDetail.rePassword
                    ) {
                        const newPasswordHash = hashPassword.hashPassword(
                            passwordDetail.newPassword
                        );
                        respones.setDataValue('password', newPasswordHash);
                        respones.save();
                        return {
                            statusCode: 200,
                            mes: 'đổi mật khẩu thành công',
                        };
                    } else {
                        throw new CustomError(400, 'mật khẩu nhập lại sai');
                    }
                } else {
                    throw new CustomError(400, 'sai mật khẩu cũ');
                }
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, 'lỗi server');
            }
        }
    };
    public passwordUpdateForgot = async(bodyPasswordUpdate: {
                email: string,
                password: string,
                newPassword: string
    }): Promise<any> => { 
        try {
            if(bodyPasswordUpdate.password !== bodyPasswordUpdate.newPassword){
                throw new CustomError(400, "mật khẩu nhập lại không đúng")
            }else {
                const result = await UserModel.update({
                    password: hashPassword.hashPassword(bodyPasswordUpdate.password)
                },{
                    where: {
                        email: bodyPasswordUpdate.email
                    }
                })
            return {
                status: true,
                statusCode:200,
                message: "cập nhật thành công"
            }
            }
        } catch (error) {
            if(error instanceof CustomError){
                throw error
            }else { 
                throw new CustomError(500, "lỗi server")
            }
        }
         
    }
}
