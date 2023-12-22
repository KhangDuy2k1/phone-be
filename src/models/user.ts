import {
    Table,
    Column,
    Default,
    DataType,
    HasMany,
    HasOne,
} from 'sequelize-typescript';
import { OrderModel } from './order';
import { CartModel } from './cart';
import { BaseModel, IBaseModel } from './base';
export interface IUserLogin {
    username: string;
    password: string;
}
export interface IUser extends IBaseModel, IUserLogin {
    googleID?: string;
    facebookID?: string;
    email: string;
    phonenumber: string;
    gender: string;
    birthDay: Date;
    address: string;
}
@Table({
    tableName: 'users',
})
export class UserModel extends BaseModel<IUser> {
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    facebookID!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    googleID!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    username!: string;

    @Default('user')
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    role!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    password!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    phonenumber!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    gender!: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    birthDay!: Date;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    address!: string;
    @HasMany(() => OrderModel)
    orders!: OrderModel[];
    @HasOne(() => CartModel)
    cart!: CartModel;
}
