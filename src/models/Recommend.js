const mongoose = require("mongoose");

const recommendSchema = mongoose.Schema(
  {
    courseId: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

recommendSchema.index({ courseId: true, userId: true }, { unique: true });

module.exports = mongoose.model("Recommend", recommendSchema);
