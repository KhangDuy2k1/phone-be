import { Transaction } from 'sequelize';
import { OrderModel } from '../models/order';
import { OrderItemModel } from '../models/orderItem';
import { IPhone, PhoneModel } from '../models/phone';
import { PhoneVariantModel } from '../models/phoneVariant';
import { CustomError } from '../utils/error';

export class OrderService {
    private sequelize: any;
    constructor(sequelize: any) {
        this.sequelize = sequelize;
    }
    private checkIdOrder = async (id: number): Promise<any> => {
        try {
            const isCheck = await OrderModel.findByPk(id);
            return !!isCheck;
        } catch (error) {
            throw new CustomError(500, 'lỗi server');
        }
    };
    orderDirectPayment = async (bodyOrder: {
        id_user: number;
        id_orders: number[];
        total_amount: number;
        phone_order: string;
        address_order: string;
    }): Promise<any> => {
        const transaction = await this.sequelize.transaction();
        try {
            const response = await Promise.all(
                bodyOrder.id_orders.map((id, index) => {
                    return (async (): Promise<any> => {
                        const orderItem = await OrderItemModel.findByPk(id, {
                            include: {
                                model: PhoneVariantModel,
                                include: [
                                    {
                                        model: PhoneModel,
                                    },
                                ],
                            },
                        });
                        let result: number = orderItem?.quantity
                            ? orderItem?.toJSON().phone_variant.phone
                                  .inventory_number -
                              orderItem?.toJSON().quantity
                            : 0;
                        if (result < 0) {
                            throw new CustomError(
                                409,
                                'quá số lượng trong kho'
                            );
                        } else {
                            const phone = await PhoneModel.findOne({
                                where: {
                                    id: orderItem?.phone_variant.phone.id,
                                },
                            });

                            phone?.inventory_number
                                ? (phone.inventory_number = result)
                                : undefined;
                            await phone?.save({ transaction });
                            return orderItem?.toJSON();
                        }
                    })();
                })
            );
            const { dataValues } = await OrderModel.create(
                {
                    user_id: bodyOrder.id_user,
                    order_adress: bodyOrder.address_order,
                    phone_adress: bodyOrder.phone_order,
                    total_amount: bodyOrder.total_amount,
                },
                {
                    transaction,
                }
            );
            await Promise.all(
                response.map((orderItem, index) => {
                    return (async (): Promise<any> => {
                        await OrderItemModel.update(
                            {
                                order_id: dataValues.id,
                                cart_id: null,
                            },
                            {
                                where: {
                                    id: orderItem?.id,
                                },
                                transaction,
                            }
                        );
                    })();
                })
            );
            await transaction.commit();
            return {
                success: true,
                statusCode: 200,
                message: 'đặt hàng thành công',
            };
        } catch (error) {
            await transaction.rollback();
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, 'lỗi server');
            }
        }
    };
    updateInfoOrder = async (bodyUpdate: {
        id_order: number;
        adress_order: string;
        phone_order: string;
    }): Promise<any> => {
        try {
            const isCheck = await this.checkIdOrder(bodyUpdate.id_order);
            if (!isCheck) {
                throw new CustomError(404, 'không tìm thấy id');
            } else {
                const order = await OrderModel.update(
                    {
                        phone_adress: bodyUpdate.phone_order,
                        order_adress: bodyUpdate.adress_order,
                    },
                    {
                        where: {
                            id: bodyUpdate.id_order,
                        },
                    }
                );
            }
            return {
                success: true,
                statusCode: 200,
                message: 'cập nhật thông tin thành công',
            };
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, 'lỗi server');
            }
        }
    };
    cancleOrder = async (id: number): Promise<any> => {
        let transaction = await this.sequelize.transaction();
        try {
            const isCheck = await this.checkIdOrder(id);
            if (!isCheck) {
                throw new CustomError(404, 'không tìm thấy id để hủy');
            }
            const response = await OrderModel.findByPk(id, {
                include: {
                    model: OrderItemModel,
                    include: [
                        {
                            model: PhoneVariantModel,
                            include: [
                                {
                                    model: PhoneModel,
                                },
                            ],
                        },
                    ],
                },
            });
            const createdAt = response?.toJSON().createdAt;
            let timeDif: number = createdAt
                ? (Date.now() - new Date(createdAt).getTime()) / (1000 * 3600)
                : 1;
            if (timeDif > 24) {
                throw new CustomError(
                    400,
                    'không thể hủy đơn, do quá thời gian'
                );
            } else if (!response?.toJSON().orderItems.length) {
                throw new CustomError(400, 'không cơ đơn hàng');
            } else {
                await Promise.all(
                    response?.toJSON().orderItems.map((orderItem: any) => {
                        return (async (): Promise<any> => {
                            const newInventory_number: number =
                                orderItem.quantity +
                                orderItem.phone_variant.phone.inventory_number;

                            const phoneUpdate = await PhoneModel.update(
                                {
                                    inventory_number: newInventory_number,
                                },
                                {
                                    transaction,
                                    where: {
                                        id: orderItem.phone_variant.phone.id,
                                    },
                                }
                            );
                            if (!phoneUpdate[0]) {
                                throw new CustomError(
                                    500,
                                    'không thể cộng lại hàng trong kho'
                                );
                            } else {
                                await Promise.all([
                                    await OrderItemModel.update(
                                        {
                                            order_id: null,
                                        },
                                        {
                                            where: {
                                                id: orderItem.id,
                                            },
                                            transaction,
                                        }
                                    ),
                                    await OrderModel.update(
                                        {
                                            status: 'đã hủy đơn',
                                        },
                                        {
                                            transaction,
                                            where: {
                                                id: response.id,
                                            },
                                        }
                                    ),
                                ]);
                            }
                        })();
                    })
                );
            }
            await transaction.commit();
            return {
                success: true,
                statusCode: 200,
                message: 'hủy đơn thành công',
            };
        } catch (error) {
            await transaction.rollback();
            if (error instanceof CustomError) {
                throw error;
            } else {
                throw new CustomError(500, 'lỗi server');
            }
        }
    };
}
