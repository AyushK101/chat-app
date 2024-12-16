import mongoose from "mongoose";


export const chatSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  },
  recipient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  is_read: {
    type: Boolean,
    required: true
  }
},{
  timestamps: true
})


export const Chat = mongoose.model("Chat",chatSchema)