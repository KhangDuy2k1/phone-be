import {
    Column,
    DataType,
    Table,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
// import { IOrder } from '../interfaces/order';
import { UserModel } from './user';
import { OrderItemModel } from './orderItem';
import { BaseModel, IBaseModel } from './base';
interface IOrder extends IBaseModel {
    user_id: number;
    order_adress: string;
    phone_adress: string;
    total_amount: number;
    orderItems?: any;
    status?: string;
}
@Table({
    tableName: 'orders',
    collate: 'utf8mb4_unicode_ci'
})
export class OrderModel extends BaseModel<IOrder> {
    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER,
    })
    user_id!: number;
    @BelongsTo(() => UserModel)
    user!: UserModel;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    phone_adress!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    order_adress!: string;

    @Column({
        type: DataType.STRING,
        // defaultValue: 'đã đặt hàng',
    })
    status!: string;

    @Column({
        type: DataType.FLOAT,
    })
    total_amount!: number;
    @HasMany(() => OrderItemModel)
    orderItems!: OrderItemModel[];
}
