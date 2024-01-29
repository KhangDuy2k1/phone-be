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
export interface IComment extends IBaseModel {
    text: string;
    user_id: number;
    likes?: number;
    phone_id: number;
    parent_id: number;
}
@Table({
    tableName: 'comments',
    collate: 'utf8mb4_unicode_ci'
})
export class CommentModel extends BaseModel<IComment> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
    })
    text!: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    })
    likes!: number;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER,
    })
    user_id!: string;
    @BelongsTo(() => UserModel)
    user!: UserModel;

    @ForeignKey(() => PhoneModel)
    @Column({
        type: DataType.INTEGER,
    })
    phone_id!: string;
    @BelongsTo(() => PhoneModel)
    phone!: PhoneModel;

    @ForeignKey(() => CommentModel)
    @Column({
        type: DataType.INTEGER,
        defaultValue: null,
        allowNull: true,
    })
    parent_id!: string;
    @BelongsTo(() => CommentModel)
    comment!: CommentModel;
}
