import mongoose from "mongoose";


export const membershipSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  role: {
    type: String,
    enum: ['member','admin'],
    default: 'member'
  }
},{
  timestamps: true
})

export const Membership = mongoose.model("Membership",membershipSchema)  
