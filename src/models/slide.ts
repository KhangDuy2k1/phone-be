import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
@Table({
    tableName: 'slide',
})
export class SlideModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;
    @Column({
        type: DataType.STRING,
    })
    link!: string;
}
