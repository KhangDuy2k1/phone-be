import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
export interface IBaseModel {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
@Table
export class BaseModel<T extends IBaseModel> extends Model<T> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
    })
    createdAt?: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
    })
    updatedAt?: Date;
}
