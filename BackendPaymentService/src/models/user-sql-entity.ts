import { Column, DataType, Default, Model, Table } from "sequelize-typescript";

@Table({tableName: "users", modelName: "User", timestamps: false})
export class User extends Model{
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: string;

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
    })
    active!: boolean;

    @Default(null)
    @Column({
        type: DataType.STRING,
    })
    subscriptionId!: string
}