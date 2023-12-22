import {
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { PhoneModel } from './phone';
import { BaseModel, IBaseModel } from './base';
export interface IImage extends IBaseModel {
    phone_id: number;
    link: string;
}
@Table({
    tableName: 'images',
})
export class ImageModel extends BaseModel<IImage> {
    @ForeignKey(() => PhoneModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    phone_id!: number;
    @BelongsTo(() => PhoneModel)
    phone!: PhoneModel;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    link!: string;
}
