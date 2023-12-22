import { IImage } from '../models/image';
import { ImageModel } from '../models/image';
import { CustomError } from '../utils/error';
export class ImageService {
    addImage = async (image: IImage): Promise<any> => {
        try {
            const imageResponse = await ImageModel.create(image);
            return {
                statusCode: 201,
                success: true,
                message: 'Tạo ảnh thành công',
                imageResponse: imageResponse.dataValues,
            };
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    updateImage = async (id: number, bodyImage: IImage): Promise<any> => {
        try {
            const imageResponse = await ImageModel.update(bodyImage, {
                where: {
                    id: id,
                },
            });
            if (!imageResponse[0]) {
                throw new CustomError(404, 'không tìm thấy id');
            } else {
                return {
                    success: true,
                    statusCode: 200,
                    message: 'cập nhật thành công ',
                };
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, 'lối server');
            }
        }
    };
}
