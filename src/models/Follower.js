const mongoose = require("mongoose");

const followerSchema = mongoose.Schema(
  {
    followee: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    follower: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model("Follower", followerSchema);
