import { CookieOptions, Request, Response } from 'express';
import { User } from '../models/user.model';
import { asyncHandler } from '../utils/asyncHandler';
import ApiError from '../utils/apiError';
import axios from 'axios';
import { OAUTH_URI } from '../constants';
import ApiResponse from '../utils/apiResponse';

const options: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: 3600000,
};

const signup = asyncHandler(async (req: Request, res: Response) => {
  const { credentials: cred } = req.body;

  if (!cred) {
    throw new ApiError(404, 'credential is required');
  }
  const response = await axios.get(`${OAUTH_URI}${cred}`);
  const { email, name: username, picture } = response.data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const token = existingUser.generateToken();
    res
      .cookie('token', token, options)
      .status(200)
      .json(new ApiResponse(400, 'existing user found', existingUser));
  } else {
    const newUser = await User.create({ username, email, picture });
    const token = newUser.generateToken();
    res
      .cookie('token', token, options)
      .status(201)
      .json(new ApiResponse(200, 'new user created', newUser));
  }
});

const signupDummy = asyncHandler(async (req: Request, res: Response) => {
  const { username, email } = req.body;
  if (!username || !email) {
    throw new ApiError(400, 'username or email is required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(404, 'user already exists', existingUser);
  }
  const newUser = await User.create({ username, email });
  const token = newUser.generateToken();
  console.log(token);

  res
    .cookie('token', token)
    .status(200)
    .json(new ApiResponse(200, 'userCreated successfully', existingUser));
});

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(new ApiResponse(200, 'current user fetched successfully', req.user));
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  res
    .cookie('token', '', options)
    .status(200)
    .json(new ApiResponse(200, 'use logged out successfully', ''));
});

export { signup, getCurrentUser, signupDummy, logout };
