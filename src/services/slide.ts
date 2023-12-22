import { SlideModel } from '../models/slide';
import { CustomError } from '../utils/error';
export class SlideService {
    private checkBodySlice = async (link: string): Promise<boolean> => {
        try {
            const isCheck = await SlideModel.findOne({
                where: {
                    link: link,
                },
            });
            return !!isCheck;
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    getAllSlice = async (): Promise<any> => {
        try {
            const slides = await SlideModel.findAll({
                attributes: ['id', 'link'],
            });
            return {
                success: true,
                statusCode: 200,
                slides,
            };
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    addSlide = async (sliceBody: { link: string }): Promise<any> => {
        try {
            const isCheck = await this.checkBodySlice(sliceBody.link);
            if (isCheck) {
                throw new CustomError(409, 'đã tồn tại');
            } else {
                const response = await SlideModel.create(sliceBody);
                return {
                    success: true,
                    statusCode: 201,
                    message: 'thêm thành công',
                    newSlide: response.dataValues,
                };
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, 'lỗi server');
            }
        }
    };
}
