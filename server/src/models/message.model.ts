import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  // attachments: {
  //   type: [
  //     {
  //       url: String,
  //       localPath: String,
  //     }
  //   ]
  // },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

},{
  timestamps: true
})


export const Message = mongoose.model('Message',messageSchema)

