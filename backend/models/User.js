const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    profileImageUrl: { type: String, default: null }, // camelCase 권장
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
