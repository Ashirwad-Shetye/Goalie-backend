const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a username"],
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
    },

    avatarID: {
      type: Number,
      required: [true, "Please select avatar"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
