import mongoose from "mongoose";

const DayMemorySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, "Date is required"],
      trim: true,
    },
    note: {
      type: String,
      trim: true,
      default: "",
      maxlength: [5000, "Note cannot exceed 5000 characters"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
  },
  { timestamps: true },
);

DayMemorySchema.index({ date: 1, userId: 1 }, { unique: true });

const DayMemory =
  mongoose.models.DayMemory || mongoose.model("DayMemory", DayMemorySchema);

export default DayMemory;
