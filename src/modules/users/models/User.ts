import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser {
  id?: string;
  username: string;
  password: string;
  created_at: Date;
}

export enum CustomValidation {
  duplicated = "duplicated",
  required = "required",
}

export interface IUserModel extends Omit<IUser, "id">, Document {}

const schema = new Schema<IUserModel>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

schema.path("username").validate(
  async function (username: string) {
    const usernameCount = await mongoose.models.User.countDocuments({
      username,
    });

    return !usernameCount;
  },
  "already exists",
  CustomValidation.duplicated
);

export const User: Model<IUserModel> = mongoose.model("User", schema);
