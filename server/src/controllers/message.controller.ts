import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import ApiResponse from "../utils/apiResponse";
import ApiError from "../utils/apiError";
import { Message } from "../models/message.model";


const createMessage = asyncHandler( async (req: Request, res: Response) => {
  const { chatId, content } = req.body;
  if(!chatId || !content) 
    throw new ApiError(400,'req. data is not present',null);

  const newMessage = {
    senderId: req.user._id,
    content,
    chatId
  }

  const createMessage = await Message.create(newMessage);

  // const userPopulatedMessage = await User.populate(createMessage, {
  //   path: "chatId.users",
  //   select: "username picture email"
  // })
  // if(!userPopulatedMessage)
  //   throw new ApiError(500,"failed to send message", userPopulatedMessage);

  // await Chat.findByIdAndUpdate(chatId,{
  //   latestMessage: userPopulatedMessage
  // })

  const fullPopulatedMessage = await Message.findById(createMessage._id)
  .populate("senderId") // Populate sender
  .populate({
    path: "chatId", // Populate the chat
    populate: {
      path: "users", // Then populate the users inside chat
      select: "username picture email"
    }
  });

  res.status(200).json(new ApiResponse(200,'message sent successfully',fullPopulatedMessage));
})

const getAllMessagesOfAChat  = asyncHandler( async (req: Request, res: Response) => {
  const { chatId } = req.params;
  if(!chatId)
    throw new ApiError(400,"chatId missing", null)

  const allMessages = await Message.find({chatId}).populate("senderId").populate("chatId");

  res.status(200).json(new ApiResponse(200,'message sent successfully', allMessages));
})


export { createMessage, getAllMessagesOfAChat };