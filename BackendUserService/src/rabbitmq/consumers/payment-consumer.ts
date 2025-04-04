import { User } from "../../models/user-sql-entity";
import { BaseRabbitMQConsumer } from "../base-rabbit-consumer";

interface UserPaidEvent {
  id: string;
  active: boolean;
}

export class PaymentConsumer extends BaseRabbitMQConsumer<UserPaidEvent> {
  routingKey: string = "pay";
  exchange: string = "user";

  async onMessage(data: UserPaidEvent): Promise<void> {
    console.log("User paid event received:", data);
    try {
      const [updatedCount] = await User.update(
        { active: data.active },
        { where: { id: data.id } }
      );

      if (!updatedCount) {
        console.warn(`User with ID ${data.id} not found`);
      } else {
        console.log(`User ${data.id} updated to active=${data.active}`);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  }
}