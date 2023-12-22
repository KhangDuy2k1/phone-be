import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    ForeignKey,
    Table,
    BelongsTo,
    HasMany,
    BelongsToMany,
} from 'sequelize-typescript';
// import { IPhone } from '../interfaces/phone';
import { CategoryModel } from './category';
// import { ConfigModel } from './config';
import { DiscountModel } from './discount';
import { ConfigModel } from './config';
import { ImageModel } from './image';
import { ColorModel } from './color';
import { PhoneVariantModel } from './phoneVariant';
import { StorageModel } from './storage';
import { BaseModel, IBaseModel } from './base';
export interface IPhone extends IBaseModel {
    name: string;
    discount_id: number;
    category_id: number;
    config_id: number;
    inventory_number: number;
    avatar: string;
    desc: string;
    price: number;
}
@Table({
    tableName: 'phones',
})
export class PhoneModel extends BaseModel<IPhone> {
    @ForeignKey(() => CategoryModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    category_id!: number;
    @BelongsTo(() => CategoryModel)
    category!: CategoryModel;

    @ForeignKey(() => DiscountModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    discount_id!: number;
    @BelongsTo(() => DiscountModel)
    discount!: DiscountModel;

    @ForeignKey(() => ConfigModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    config_id!: number;
    @BelongsTo(() => ConfigModel)
    config!: ConfigModel;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    inventory_number!: number;

    @Column({
        type: DataType.STRING,
    })
    avatar!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    desc!: string;
    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    price!: number;
    @BelongsToMany(() => ColorModel, () => PhoneVariantModel)
    colors!: ColorModel[];
    @BelongsToMany(() => StorageModel, () => PhoneVariantModel)
    storage!: StorageModel[];
    @HasMany(() => ImageModel)
    images!: ImageModel[];
}
