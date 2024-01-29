import { CartModel } from '../models/cart';
import { Op } from 'sequelize';
import { OrderItemModel } from '../models/orderItem';
import { PhoneModel } from '../models/phone';
import { PhoneVariantModel } from '../models/phoneVariant';
import { CustomError } from '../utils/error';

export class OrderItemService {
    private sequelize: any;
    constructor(sequelize: any) {
        this.sequelize = sequelize;
    }
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
    public bestSellingPhone = async (): Promise<any> => {
        try {
            const response = await this.sequelize.query(
                `SELECT distinct
                  phones.id, 
                  discounts.scale, 
                  phones.inventory_number,
                  phones.avatar ,
                  phones.name,
                  phones.price,
                  phones.star_number,
                  sum(orderItems.quantity) as sum FROM orderItems 
                 JOIN phone_variants ON orderItems.phone_variant_id = phone_variants.id
                 JOIN phones ON phone_variants.phone_id = phones.id 
                 JOIN discounts ON discounts.id = phones.discount_id
                 WHERE orderItems.order_id IS NOT NULL
                 GROUP BY phones.id 
                 ORDER BY sum desc
                 LIMIT 10
                `
            );
            return {
                success: true,
                message: 'lấy thành công',
                statusCode: 200,
                phones: response[0],
            };
        } catch (error) {
            console.error(error)
            throw new CustomError(500, 'lỗi server');
        }
    };
    public deleteOrderItem = async(id_item: number):Promise<any> => {
        try {
            const result = await OrderItemModel.destroy({
                where: {
                    id: id_item
                }
            })
            return {
                statusCode: 200,
                message: "Xóa thành công"
            }
        } catch (error) {
            throw new CustomError(500, "lỗi server");
        }
    }
    public updateQuantity = async(id_item: number, new_quantity: number):Promise<any> => {
         try {
  
            const result = await OrderItemModel.update({
                    quantity: new_quantity
            }, {
                where: {
                    id: id_item
                }
            })
            return {
                statusCode :200,
                message: "Cập nhật số lượng thành công"
            }
         } catch (error) {
            throw new CustomError(500, "lỗi server")
         }
    }
}
