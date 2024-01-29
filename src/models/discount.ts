import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { PhoneModel } from './phone';
import { BaseModel, IBaseModel } from './base';
export interface IDiscount extends IBaseModel {
    scale: number;
}
@Table({
    tableName: 'discounts',
    collate: 'utf8mb4_unicode_ci'
})
export class DiscountModel extends BaseModel<IDiscount> {
    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    scale!: number;
    @HasMany(() => PhoneModel)
    phones!: PhoneModel[];
}
