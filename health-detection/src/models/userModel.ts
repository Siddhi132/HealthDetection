import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  activities: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Activity"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export const User =  mongoose.models.User || mongoose.model("User", UserSchema);
