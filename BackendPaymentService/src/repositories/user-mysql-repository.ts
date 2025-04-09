import { injectable } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IUser } from "../interfaces/IUser";
import { User } from "../models/user-sql-entity";

@injectable()
export class UserSqlRepository implements IUserRepository{
    async getUser(id: string): Promise<IUser | null> {
        return await User.findByPk(id);
    }
    async updateUser(id: string, subscriptionId: string): Promise<IUser | null> {
        await User.update(
          {
            active: true,
            subscriptionId: subscriptionId,
          },
          { where: { id } }
        );
        return await User.findByPk(id);
      }
    // async updateSubscriptionId(id: string, subscriptionId: string): Promise<IUser | null> {
    //     await User.update(
    //         { subscriptionId },
    //         { where: { id } }
    //     );
    //     return await User.findByPk(id);
    // }
}