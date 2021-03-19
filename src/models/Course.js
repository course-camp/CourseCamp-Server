const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    publisher: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseURL: {
      type: String,
      unique: true,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    tags: {
      type: [String],
    },
    recommendCount: {
      type: Number,
      default: 1,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

courseSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "courseId",
});

courseSchema.virtual("recommends", {
  ref: "Recommend",
  localField: "_id",
  foreignField: "courseId",
});

module.exports = mongoose.model("Course", courseSchema);
