import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  shop: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);