const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    username: {
      type: String,
      index: {
        partialFilterExpression: { username: { $type: "string" } },
        unique: true,
      },
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
    refreshToken: {
      type: String,
      unique: true,
    },
    summary: {
      type: String,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("publishedCourses", {
  ref: "Course",
  localField: "_id",
  foreignField: "publisher",
});

userSchema.virtual("recommends", {
  ref: "Recommend",
  localField: "_id",
  foreignField: "userId",
});

userSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "userId",
});

module.exports = mongoose.model("User", userSchema);
