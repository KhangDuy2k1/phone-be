import { CommentModel } from '../models/comment';
import { sendComment } from '../../socket';
import { UserModel } from '../models/user';
import { CustomError } from '../utils/error';
export class CommentService {
    private sequelize: any;
    constructor(sequelize: any) {
        this.sequelize = sequelize;
    }
    addComment = async (
        bodyComment: {
            phone_id: number;
            text: string;
            parent_id: number;
        },
        userInfo: any
    ): Promise<any> => {
        console.log(bodyComment);
        try {
            const response = await CommentModel.create({
                ...bodyComment,
                user_id: userInfo.id,
            });
            sendComment(bodyComment.text, userInfo, bodyComment.phone_id);
            return {
                success: true,
                statusCode: 200,
                message: 'comment thành công',
                comment: response.dataValues,
            };
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    allComment = async (): Promise<any> => {
        try {
            const comments = await this.sequelize.query(`
            select * from comments as c
            join comments as t on c.id = t.parent_id;
            `);
            console.log(comments[0]);
        } catch (error) {}
    };
}
