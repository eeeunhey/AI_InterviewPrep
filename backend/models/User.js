const mongoose = require("mongoose");
const {
  default: ProfilePhotoSelector,
} = require("../../frontend/ai-interview/src/component/inputs/ProfilePhotoSelector");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    ProfileImageUrl: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

