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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
    })
    active!: boolean;
}