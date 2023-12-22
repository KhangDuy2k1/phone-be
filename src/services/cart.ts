import { CartModel } from '../models/cart';
import { ColorModel } from '../models/color';
import { OrderItemModel } from '../models/orderItem';
import { PhoneModel } from '../models/phone';
import { PhoneVariantModel } from '../models/phoneVariant';
import { StorageModel } from '../models/storage';
import { CustomError } from '../utils/error';

export class CartService {
    private checkId = async (id: number): Promise<boolean> => {
        try {
            const isCheck = await CartModel.findByPk(id);
            return !!isCheck;
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    getOrderItemCart = async (id: number): Promise<any> => {
        try {
            const cart = await CartModel.findOne({
                where: {
                    user_id: id,
                },
            });
            if (!cart) {
                throw new CustomError(404, 'không có sản phẩm nào');
            } else {
                const response = await CartModel.findByPk(cart.id, {
                    attributes: ['id', 'user_id'],
                    include: {
                        model: OrderItemModel,
                        attributes: ['id', 'quantity'],
                        include: [
                            {
                                model: PhoneVariantModel,
                                attributes: ['id'],
                                include: [
                                    {
                                        model: PhoneModel,
                                        attributes: [
                                            'id',
                                            'name',
                                            'desc',
                                            'avatar',
                                            'price',
                                        ],
                                    },
                                    {
                                        model: ColorModel,
                                        attributes: ['id', 'name'],
                                    },
                                    {
                                        model: StorageModel,
                                        attributes: ['id', 'memory'],
                                    },
                                ],
                            },
                        ],
                    },
                });
                return {
                    success: true,
                    message: 'lấy thành công',
                    statusCode: 200,
                    orderItem: response?.toJSON(),
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
