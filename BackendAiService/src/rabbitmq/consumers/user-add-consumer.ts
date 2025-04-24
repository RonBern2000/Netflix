import { BaseRabbitMQConsumer, Exchanges } from "@netflix-utils/shared";
import UserToMovie from "../../models/user-to-movie-entity";

interface UserAddedMovieEvent {
  exchange: Exchanges.UserToMovie;
  data: { userId: string, movieId: number};
}

export class UserAddConsumer extends BaseRabbitMQConsumer<UserAddedMovieEvent> {
  routingKey: string = "add";
  exchange: Exchanges.UserToMovie = Exchanges.UserToMovie;

  async onMessage(data: UserAddedMovieEvent['data']): Promise<void> {
    console.log("User added event received:", data);
    try {
      const doc = UserToMovie.build(data);
      await doc.save();
    } catch (error) {
      console.error("Failed to update userToMovie:", error);
    }
  }
}