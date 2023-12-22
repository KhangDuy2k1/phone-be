import { IDiscountService } from '../interfaces/service';
import { IDiscount } from '../models/discount';
import { DiscountModel } from '../models/discount';
import { CustomError } from '../utils/error';

export class DiscountService implements IDiscountService {
    getAllDiscount = async (): Promise<any> => {
        try {
            const discounts = await DiscountModel.findAll({
                raw: true,
            });
            return {
                success: true,
                statusCode: 200,
                message: 'lấy thành công',
                discounts,
            };
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    addDiscount = async (discount: IDiscount): Promise<any> => {
        try {
            const response = await DiscountModel.create(discount);
            return {
                statusCode: 201,
                mes: 'thêm giảm giá thành công',
                response,
            };
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    deleteDiscount = async (id: number): Promise<any> => {
        try {
            const response = await DiscountModel.destroy({
                where: {
                    id: id,
                },
            });
            if (!response) {
                throw new CustomError(400, 'không thể xóa');
            } else {
                return {
                    success: true,
                    statusCode: 200,
                    message: 'Xóa thành công',
                };
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw new CustomError(500, 'lỗi server');
        }
    };
    updateDiscount = async (
        id: number,
        bodyDiscount: IDiscount
    ): Promise<any> => {
        try {
            const response = await DiscountModel.update(
                {
                    scale: bodyDiscount.scale,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            if (!response[0]) {
                throw new CustomError(400, 'không tìm thấy id');
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
            }
            throw new CustomError(500, 'lỗi server');
        }
    };
}
