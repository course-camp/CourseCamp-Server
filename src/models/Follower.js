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

followerSchema.index({ followee: 1, follower: 1 }, { unique: true });

module.exports = mongoose.model("Follower", followerSchema);
