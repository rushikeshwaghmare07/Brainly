import mongoose, { Document, Schema, Model } from "mongoose";

export interface ILink extends Document {
  hash: string;
  userId: mongoose.Types.ObjectId;
}

const LinkSchema: Schema<ILink> = new Schema(
  {
    hash: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
);

const LinkModel: Model<ILink> = mongoose.model<ILink>(
  "Link",
  LinkSchema
);

export default LinkModel;
