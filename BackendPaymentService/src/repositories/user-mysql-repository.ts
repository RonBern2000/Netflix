import { injectable } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IUser } from "../interfaces/IUser";
import { User } from "../models/user-sql-entity";

@injectable()
export class UserSqlRepository implements IUserRepository{
    async getUser(id: string): Promise<IUser | null> {
        return await User.findByPk(id);
    }
    async pay(id: string): Promise<IUser | null> {
        await User.update({ active: true }, { where: { id } });
        return await User.findByPk(id);
    }
}