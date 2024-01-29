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
    collate: 'utf8mb4_unicode_ci'
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
