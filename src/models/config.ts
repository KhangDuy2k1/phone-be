import { Column, DataType, HasOne, Table } from 'sequelize-typescript';
import { PhoneModel } from './phone';
import { BaseModel, IBaseModel } from './base';
export interface IConfig extends IBaseModel {
    screen: string;
    os: string;
    rear_camera: string;
    front_camera: string;
    chip: string;
    ram: number;
    pin: string;
}
@Table({
    tableName: 'configs',
})
export class ConfigModel extends BaseModel<IConfig> {
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    screen!: number;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    os!: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    rear_camera!: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    front_camera!: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    chip!: string;
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    ram!: number;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    pin!: string;
    @HasOne(() => PhoneModel)
    phone!: PhoneModel;
}
