import { User } from "../../models/user-sql-entity";
import { BaseRabbitMQConsumer } from "../base-rabbit-consumer";

interface UserSignednupEvent {
  id: string;
  active: boolean;
}

export class SignedUpConsumer extends BaseRabbitMQConsumer<UserSignednupEvent> {
  routingKey: string = "pay";
  exchange: string = "user";

  async onMessage(data: UserSignednupEvent): Promise<void> {
    console.log("User Signed up event received:", data);
    try {
      const newUser = await User.create(
        {
            id: data.id,
            active: data.active,
        }
      );

      if (!newUser) {
        console.warn(`user was not created`);
      } else {
        console.log(`User was created`);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  }
}