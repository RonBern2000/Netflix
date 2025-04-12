import { Column, DataType, Default, Model, Table } from "sequelize-typescript";

@Table({tableName: "usersLike", modelName: "UserLike", timestamps: false})
export class UserLike extends Model{
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: string;
    
    @Column({
    type: DataType.TEXT,
    get() {
        const rawValue = this.getDataValue("likedMovies");
        return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value: number[]) {
        this.setDataValue("likedMovies", JSON.stringify(value));
    }
    })
    likedMovies!: number[];
}