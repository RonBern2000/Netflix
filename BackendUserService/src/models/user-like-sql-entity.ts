import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "usersToMovies", modelName: "UserToMovie", timestamps: false})
export class UserToMovie extends Model{
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
    })
    id!: string;

    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId!: string;
    
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    movieId!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "genres",
        set(genre_ids: number[]) {
            this.setDataValue("genres", genre_ids.join(","));
        },
        get() {
            const rawValue = this.getDataValue("genres");
            return rawValue ? rawValue.split(",").map(Number) : [];
        },
    })
    genre_ids!: number[];

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    key!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    overview!: string;

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    popularity!: number;

     @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    poster_path!: string;

     @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    backdrop_path!: string;

     @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    release_date!: string;
    
     @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title!: string;

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    vote_average!: number;

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    vote_count!: number;
}