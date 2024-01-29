import { ColorModel, IColor } from '../models/color';
import { CustomError } from '../utils/error';

export class ColorService {
    public addColor = async (color: IColor): Promise<any> => {
        try {
            const checkColorExist = await ColorModel.findOne({
                where: {
                    name: "đỏ",
                },
            });

            if (checkColorExist) {
                throw new CustomError(409, 'color đã tồn tại ');
            } else {
                const colorCreated = await ColorModel.create(color);
                return {
                    success: true,
                    statusCode: 201,
                    message: 'thêm color thành công',
                    colorCreated,
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
    public deleteColor = async (id: number): Promise<any> => {
        try {
            const response = await ColorModel.destroy({
                where: {
                    id: id,
                },
            });
            if (!response) {
                throw new CustomError(404, 'không tìm thấy id');
            } else {
                return {
                    success: true,
                    statusCode: 200,
                    message: 'xóa thành công',
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
    public updateColor = async (
        id: number,
        colorBody: IColor
    ): Promise<any> => {
        try {
            const response = await ColorModel.update(
                {
                    name: colorBody.name,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            if (!response[0]) {
                throw new CustomError(404, 'không thể cập nhật');
            } else {
                return {
                    success: true,
                    statusCode: 200,
                    message: 'cập nhật thành công',
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
