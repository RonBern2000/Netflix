import { BaseRabbitMQConsumer, Exchanges } from "@netflix-utils/shared";
import UserToMovie from "../../models/user-to-movie-entity";

interface UserRemovedovieEvent {
  exchange: Exchanges.UserToMovie;
  data: { userId: string, movieId: number};
}

export class UserRemoveConsumer extends BaseRabbitMQConsumer<UserRemovedovieEvent> {
  routingKey: string = "remove";
  exchange: Exchanges.UserToMovie = Exchanges.UserToMovie;

  async onMessage(data: UserRemovedovieEvent['data']): Promise<void> {
    console.log("User removed event received:", data);
    try {
        await UserToMovie.deleteOne({
            userId: data.userId,
            movieId: data.movieId
        });
    } catch (error) {
      console.error("Failed to remove userToMovie", error);
    }
  }
}