import { Request, Response } from "express"
import { UserService } from "../services/user"
export class UserController { 
    private userService : UserService;
    constructor(userService: UserService){
           this.userService = userService;
    }
    getUserById = async(req: Request, res: Response):Promise<any> => { 
            const id = (req as any).user.id
            try {
                const {statusCode, ...others} = await this.userService.getUserById(parseInt(id));
                res.status(statusCode).json({
                    ...others
                })
            } catch (error:any) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                })
            }
    }
}