import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    emailId: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    accessToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);

export default user;
