//--- DB에 저장되는 데이터의 모양을 정의 
import mongoose from "mongoose";

const CapsuleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    openDate: {
      type: Date,
      required: true
    },
    isOpened: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true  // createdAt 자동 생성
  }
);

export default mongoose.model("Capsule", CapsuleSchema);