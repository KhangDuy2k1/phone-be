import { Table, Column, HasMany, DataType } from 'sequelize-typescript';
import { PhoneModel } from './phone';
import { BaseModel, IBaseModel } from './base';
export interface ICategory extends IBaseModel {
    name: string;
}
@Table({
    tableName: 'categories',
    collate: 'utf8mb4_unicode_ci'
})
export class CategoryModel extends BaseModel<ICategory> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;
    @HasMany(() => PhoneModel)
    phones!: PhoneModel[];
}
