import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Table,
} from 'sequelize-typescript';
import { OrderItemModel } from './orderItem';
import { UserModel } from './user';
import { BaseModel, IBaseModel } from './base';

export interface ICart extends IBaseModel {
    user_id: number;
}

@Table({
    tableName: 'carts',
})
export class CartModel extends BaseModel<ICart> {
    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER,
        unique: true,
    })
    user_id!: number;

    @BelongsTo(() => UserModel)
    user!: UserModel;

    @HasMany(() => OrderItemModel)
    orderItems!: OrderItemModel[];
}
