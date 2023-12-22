import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript';
import { PhoneModel } from './phone';
import { PhoneVariantModel } from './phoneVariant';
import { IBaseModel } from './base';
export interface IStorage extends IBaseModel {
    memory: number;
}
@Table({
    tableName: 'storages',
})
export class StorageModel extends Model<IStorage> {
    @Column({
        type: DataType.INTEGER,
    })
    memory!: number;
    @BelongsToMany(() => PhoneModel, () => PhoneVariantModel)
    phones!: StorageModel[];
}
