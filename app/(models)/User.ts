import mongoose, { Schema } from "mongoose";

export interface UserDoc extends Document {
  name: String;
  email: String;
  password: String;
}

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema<UserDoc>(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User || mongoose.model<UserDoc>("User", userSchema);

export default User;
