import { CartModel } from '../models/cart';
import { OrderItemModel } from '../models/orderItem';
import { PhoneVariantModel } from '../models/phoneVariant';
import { CustomError } from '../utils/error';

export class OrderItemService {
    public addOrderItemtoCart = async (bodyOrderItem: {
        id: number;
        phone_id: number;
        storage_id: number;
        color_id: number;
        quantity: number;
    }): Promise<any> => {
        try {
            const [phone_variant, cart] = await Promise.all([
                PhoneVariantModel.findOne({
                    where: {
                        phone_id: bodyOrderItem.phone_id,
                        storage_id: bodyOrderItem.storage_id,
                        color_id: bodyOrderItem.color_id,
                    },
                }),
                CartModel.findOne({
                    where: {
                        user_id: bodyOrderItem.id,
                    },
                }),
            ]);
            if (!phone_variant) {
                throw new CustomError(404, 'không tìm thấy phone_variant');
            } else if (!cart) {
                const cartCreated = await CartModel.create({
                    user_id: bodyOrderItem.id,
                });
                const orderItem = await OrderItemModel.create({
                    cart_id: cartCreated.dataValues.id,
                    phone_variant_id: phone_variant.id,
                    quantity: bodyOrderItem.quantity,
                });
                return {
                    success: true,
                    statusCode: 201,
                    message: 'Tạo thành công',
                    orderItem: orderItem.dataValues,
                };
            } else {
                const orderItem = await OrderItemModel.create({
                    cart_id: cart.dataValues.id,
                    phone_variant_id: phone_variant.id,
                    quantity: bodyOrderItem.quantity,
                });
                return {
                    success: true,
                    statusCode: 201,
                    message: 'Tạo thành công',
                    orderItem: orderItem.dataValues,
                };
            }
        } catch (error: any) {
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, error.errors[0].message);
            }
        }
    };
}
