import { Request, Response } from "express";
import { Room } from "../models/room.models";
import { asyncHandler } from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";


const createRoom = asyncHandler( async (req: Request, res: Response)=>{
  const { _id } = req.user
  const { roomName, description } = req.body

  const existingRoom = await Room.findOne({name: roomName, admin: _id})
  if(existingRoom) {
    throw new ApiError(409,"group already exists",existingRoom)
  }

  const newRoom = await Room.create({name: roomName,admin:_id, description, members: [req.user]})  
  res
    .status(200)
    .json(new ApiResponse(200,'room created Successfully',newRoom))
})

const deleteRoom = asyncHandler( async (req:Request, res:Response)=>{

})

export {
  createRoom,
  deleteRoom
}