import mongoose, { Document, Model } from "mongoose";
import { IUserToMovie } from "../interfaces/IUserToMovie";

interface UserToMovieDoc extends Document{
    userId: string;
    movieId: number;
}

interface UserToMovieModel extends Model<UserToMovieDoc>{
    build(attribute: IUserToMovie): UserToMovieDoc;
}

const userToMovieSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
},{
    toJSON: {
        transform(_, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});
userToMovieSchema.statics.build = (attrs: IUserToMovie) => { return new UserToMovie(attrs); };
const UserToMovie = mongoose.model<UserToMovieDoc, UserToMovieModel>("UserToMovie", userToMovieSchema);

export default UserToMovie;