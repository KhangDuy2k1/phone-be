import { Table, Column, HasMany, DataType } from 'sequelize-typescript';
import { PhoneModel } from './phone';
import { BaseModel, IBaseModel } from './base';
export interface ICategory extends IBaseModel {
    name: string;
}
@Table({
    tableName: 'categories',
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
