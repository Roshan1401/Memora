import mongoose from "mongoose";

const MomentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    emoji: {
      type: String,
      trim: true,
      default: "",
      maxlength: [32, "Emoji cannot exceed 32 characters"],
    },
    time: {
      type: String,
      trim: true,
      default: "",
    },
    dayMemoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DayMemory",
      required: [true, "Day memory reference is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
  },
  { timestamps: true },
);

const Moment = mongoose.models.Moment || mongoose.model("Moment", MomentSchema);

export default Moment;
