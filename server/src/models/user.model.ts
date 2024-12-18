import mongoose, { Model } from 'mongoose'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRE, JWT_SECRET } from '../constants'
import ApiError from '../utils/apiError'



export interface IUserDocument extends Document {
  _id: string,
  username: string,
  email: string,
  picture: string,
  generateToken: ()=> string
}

type IUserModel = Model<IUserDocument>





export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  picture: {
    type: String,
  }
},{
  timestamps: true
})
userSchema.index({email: 1})


userSchema.methods.generateToken = function() {
  try {
    const payload = {
      _id: this._id,
      email: this.email
    }
    
    return jwt.sign( payload, JWT_SECRET ,{expiresIn: JWT_EXPIRE})
  } catch (error) {
    throw new ApiError(500,'error while generating token',error)
  }
}

export const User: IUserModel = mongoose.model<IUserDocument,IUserModel>("User",userSchema)  
