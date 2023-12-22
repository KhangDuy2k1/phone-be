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
}
@Table({
    tableName: 'phone_variants',
})
class PhoneVariantModel extends BaseModel<IPhoneVariant> {
    @ForeignKey(() => PhoneModel)
    @Column
    phone_id!: number;
    @BelongsTo(() => PhoneModel)
    phone!: PhoneModel;

    @ForeignKey(() => ColorModel)
    @Column
    color_id!: number;
    @BelongsTo(() => ColorModel)
    color!: ColorModel;

    @ForeignKey(() => StorageModel)
    @Column
    storage_id!: number;
    @BelongsTo(() => StorageModel)
    storage!: StorageModel;

    @HasMany(() => OrderItemModel)
    orderItems!: OrderItemModel[];
}

export { PhoneVariantModel };
