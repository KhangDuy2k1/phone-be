import {
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { BaseModel, IBaseModel } from './base';
import { UserModel } from './user';
import { PhoneModel } from './phone';

export interface IReview extends IBaseModel {
    user_id: number;
    phone_id: number;
    star_number: number;
}
@Table({
    tableName: 'reviews',
})
export class ReviewModel extends BaseModel<IReview> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id!: number;
    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER,
    })
    user_id!: number;
    @BelongsTo(() => UserModel)
    user!: UserModel;

    @ForeignKey(() => PhoneModel)
    @Column({
        type: DataType.INTEGER,
    })
    phone_id!: number;
    @BelongsTo(() => PhoneModel)
    phone!: PhoneModel;

    @Column({
        type: DataType.INTEGER,
    })
    star_number!: number;
}
