import {
    BelongsTo,
    Column,
    DataType,
    Table,
    ForeignKey,
} from 'sequelize-typescript';
import { PhoneVariantModel } from './phoneVariant';
import { CartModel } from './cart';
import { OrderModel } from './order';
import { BaseModel, IBaseModel } from './base';
export interface IOrderItem extends IBaseModel {
    phone_variant_id: number;
    cart_id?: number | null;
    order_id?: number | null;
    quantity: number;
    phone_variant: any;
}
@Table({
    tableName: 'orderItems',
    collate: 'utf8mb4_unicode_ci'
})
export class OrderItemModel extends BaseModel<IOrderItem> {
    @ForeignKey(() => PhoneVariantModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    phone_variant_id!: number;
    @BelongsTo(() => PhoneVariantModel)
    phone_variant!: PhoneVariantModel;

    @ForeignKey(() => CartModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    cart_id!: number;
    @BelongsTo(() => CartModel)
    cart!: CartModel;

    @ForeignKey(() => OrderModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    order_id!: number;
    @BelongsTo(() => OrderModel)
    order!: OrderModel;
    @Column({
        type: DataType.INTEGER,
    })
    quantity!: number;
}
