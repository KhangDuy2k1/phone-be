import {
    Column,
    DataType,
    Table,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { PhoneModel } from './phone';
import { StorageModel } from './storage';
import { ColorModel } from './color';
import { OrderItemModel } from './orderItem';
import { BaseModel, IBaseModel } from './base';
export interface IPhoneVariant extends IBaseModel {
    phone_id: number;
    color_id: number;
    storage_id: number;
    price_detail: number
}
@Table({
    tableName: 'phone_variants',
    collate: 'utf8mb4_unicode_ci',
})
class PhoneVariantModel extends BaseModel<IPhoneVariant> {
    @ForeignKey(() => PhoneModel)
    @Column({
        type: DataType.INTEGER,
    })
    phone_id!: number;
    @BelongsTo(() => PhoneModel)
    phone!: PhoneModel;

    @ForeignKey(() => ColorModel)
    @Column({
        type: DataType.INTEGER,
    })
    color_id!: number;
    @BelongsTo(() => ColorModel)
    color!: ColorModel;

    @ForeignKey(() => StorageModel)
    @Column({
        type: DataType.INTEGER,
    })
    storage_id!: number;
    @BelongsTo(() => StorageModel)
    storage!: StorageModel;
    
    @Column({
        type: DataType.FLOAT,
    })
    price_detail!: number

    @HasMany(() => OrderItemModel)
    orderItems!: OrderItemModel[];
}

export { PhoneVariantModel };
