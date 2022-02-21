import mongoose, { Schema, Document, Model } from "mongoose";

import { CustomValidation } from "@src/modules/users/models/User";

export interface IProject {
  id?: string;
  name: string;
  path: string;
  user_id: string;
  created_at: Date;
}

export interface IProjectModel extends Omit<IProject, "id">, Document {}

const schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    path: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    created_at: { type: Date, default: new Date() },
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

schema.path("name").validate(
  async function (name: string) {
    const nameCount = await mongoose.models.Project.countDocuments({
      name,
    });

    return !nameCount;
  },
  "already exists",
  CustomValidation.duplicated
);

export const Project: Model<IProjectModel> = mongoose.model("Project", schema);
