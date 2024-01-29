import {
    HasMany,
    Column,
    DataType,
    Model,
    Table,
    BelongsToMany,
} from 'sequelize-typescript';
import { PhoneVariantModel } from './phoneVariant';
import { PhoneModel } from './phone';
import { BaseModel, IBaseModel } from './base';
export interface IColor extends IBaseModel {
    name: string;
}
@Table({
    tableName: 'colors',
    collate: 'utf8mb4_unicode_ci'
})
export class ColorModel extends BaseModel<IColor> {
    @Column({
        type: DataType.STRING,
    })
    name!: string;
    // @BelongsToMany(() => PhoneModel, () => PhoneVariantModel)
    // phones!: PhoneModel[];
    @HasMany(() => PhoneVariantModel)
    phone_variants!: PhoneVariantModel[]
}
