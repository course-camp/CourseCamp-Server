const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    username: {
      type: String,
      unique: true,
    },
    displayName: {
      type: String,
      default: "Anonymous",
    },
    emailId: {
      type: String,
      required: true,
    },
    interests: [String],
    connections: {
      type: [String],
      ref: "User",
    },
    refreshToken: {
      type: String,
      unique: true,
    },
    summary: {
      type: String,
    },
    publishedCourses: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Course",
      },
    ],
    recommended: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Course",
      },
    ],
    recommendations: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Course",
      },
    ],
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false, timestamps: true }
);

userSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "userId",
});

//TODO: Implement followers and following for user model
// userSchema.virtual("followers", {
//   ref: "Follower",
//   localField: "_id",
//   foreignField: "followee",
// });

// userSchema.virtual("following", {
//   ref: "Follower",
//   localField: "_id",
//   foreignField: "follower",
// });

module.exports = mongoose.model("User", userSchema);
