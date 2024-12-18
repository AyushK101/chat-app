import { Room } from '../models/room.models';
import { Chat } from '../models/chat.models';
import { User } from '../models/user.model';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';
import ApiResponse from '../utils/apiResponse';

const getAllUserChats = asyncHandler(async (req: Request, res: Response) => {
  // const response = await Room.aggregate([
  //   {

  //   }
  // ])
  console.log(req.user);

  res.status(200).json(new ApiResponse(200, 'user chats fetched successfully', []));
});

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const allUsers = await User.find({ _id: { $ne: req.user._id } });

  res.status(200).json(new ApiResponse(200, 'all users', allUsers));
});

const createOrGetAOneOnOneChat = asyncHandler(async (req: Request, res: Response) => {});

const createAGroupChat = asyncHandler(async (req: Request, res: Response) => {});

const getGroupChatDetails = asyncHandler(async (req: Request, res: Response) => {});

const renameGroupChat = asyncHandler(async (req: Request, res: Response) => {});

const deleteGroupChat = asyncHandler(async (req: Request, res: Response) => {});

const addNewParticipantInGroupChat = asyncHandler(async (req: Request, res: Response) => {});

const removeParticipantFromGroupChat = asyncHandler(async (req: Request, res: Response) => {});

const leaveGroupChat = asyncHandler(async (req: Request, res: Response) => {});

const deleteOneOnOneChat = asyncHandler(async (req: Request, res: Response) => {});

export {
  getAllUserChats,
  getAllUsers,
  createOrGetAOneOnOneChat,
  createAGroupChat,
  getGroupChatDetails,
  renameGroupChat,
  deleteGroupChat,
  removeParticipantFromGroupChat,
  addNewParticipantInGroupChat,
  deleteOneOnOneChat,
  leaveGroupChat,
};
