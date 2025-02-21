import mongoose, { Document, Schema, Model } from "mongoose";

export interface IContent extends Document {
  title: string;
  link: string;
  tags: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema: Schema<IContent> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContentModel: Model<IContent> = mongoose.model<IContent>( "Content", ContentSchema );

export default ContentModel;
