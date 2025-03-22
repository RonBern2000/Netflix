import { injectable } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IUser } from "../interfaces/IUser";
import { User } from "../models/user-sql-entity";
import { SignupRequestDTO } from "../DTOs/signup-dto";

@injectable()
export class UserSqlRepository implements IUserRepository{
    async create(data: SignupRequestDTO): Promise<IUser | null> {
        return await User.create({
            name: data.name,
            email: data.email,
            password: data.password
        });
    }
    async findUserByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({where : {email}});
    }
}