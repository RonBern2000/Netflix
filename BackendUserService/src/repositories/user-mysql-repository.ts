import { injectable } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IUser } from "../interfaces/IUser";
import { User } from "../models/user-sql-entity";
import { SignupRequestDTO } from "../DTOs/signup-dto";

@injectable()
export class UserSqlRepository implements IUserRepository{
    async findUserById(id: string): Promise<IUser | null> {
        return await User.findByPk(id);
    }
    async updateUserStatus(id:string, active:boolean): Promise<void> {
        await User.update(
            { active },
            { where: { id }}
        );
    }
    async create(data: SignupRequestDTO): Promise<IUser | null> {
        return await User.create({
            email: data.email,
            password: data.password,
            active: false
        });
    }
    async findUserByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({where : {email}});
    }
}