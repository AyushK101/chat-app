import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import ApiResponse from '../utils/apiResponse';
import { Chat } from '../models/chat.model';
import ApiError from '../utils/apiError';
// import { User } from "../models/user.model";

const chatHealth = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    msg: 'health okay 🟢',
  });
});

// creating or fetching one on one chat
const accessChat = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) throw new ApiError(400, "didn't sent receiver's id", undefined);
  let isChatExist = await Chat.find({
    isGroupChat: false,
    $and: [{ users: { $elemMatch: { $eq: req.user._id } } }, { users: { $elemMatch: { $eq: userId } } }],
  })
    .populate('users')
    .populate('latestMessage');

  //   🔁 Best Practice Summary
  // Situation	Use This
  // Populating fields in documents from the same model	Model.populate(...)
  // Populating cross-model fields or mixed arrays	mongoose.populate(...)

  isChatExist = await Chat.populate(isChatExist, {
    path: 'latestMessage.sender',
    select: 'username picture email',
  });

  if (isChatExist.length > 0) {
    res.status(200).json(new ApiResponse(200, 'chat already exists', isChatExist[0]));
  } else {
    const chatData = await Chat.create({
      chatName: 'sender',
      users: [req.user._id, userId],
      isGroupChat: false,
    });

    const findChat = await Chat.find({ _id: chatData._id }).populate('users');
    res.status(200).json(new ApiResponse(200, 'new chat created', findChat));
  }
});

const fetchChat = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.user._id);
  Chat.find({
    users: { $elemMatch: { $eq: { _id: req.user._id } } },
  })
    .populate('users')
    .populate('groupAdmin')
    .populate('latestMessage')
    .sort({updatedAt: -1})
    .then( async(results) => {
      results = await Chat.populate(results, {
        path: "latestMessage.sender",
        select: "username picture email" 
      })
      res.status(200).json(new ApiResponse(200, 'chats', results));
    })

  
});

const createGroupChat = asyncHandler(async (req: Request, res: Response) => {
  // console.log(req.body.groupName, req.body.names)
  // console.log(req.body)
  if(!req.body.groupName  || !req.body.names) 
    throw new ApiError(400,"req. data is not received","");

  const groupName = req.body.groupName;
  const users = JSON.parse(req.body.names);

  if(users.length < 2 )
    throw new ApiError(400,"at least 2 users for group chat","");
    
  users.push(req.user._id)  

  const groupChat = await Chat.create({
    isGroupChat: true,
    users,
    chatName: groupName,
    groupAdmin: req.user._id,
  });

  const fullGroupChat = await Chat.find({
    _id: groupChat._id
  }).populate("users")
    .populate("groupAdmin")

  res.status(200).json(new ApiResponse(200, 'new group chat created', fullGroupChat));
});

const renameGroupChat = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});
const groupRemove = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(new ApiResponse(200, 'chats', true));
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});


export { chatHealth, accessChat, fetchChat, addToGroup, createGroupChat, renameGroupChat, groupRemove };
