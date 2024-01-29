import { UserModel } from "../models/user"
import { CustomError } from "../utils/error"

export class UserService { 
    getUserById = async(id_user: number):Promise<any> => { 
            try {
                const result = await UserModel.findByPk(id_user)
                return { 
                    user: result,
                    statusCode : 200,
                    message: "lấy thông tin user thành công"
                }
            } catch (error) {
                throw new CustomError(500, "lỗi server")
            }
    }
}