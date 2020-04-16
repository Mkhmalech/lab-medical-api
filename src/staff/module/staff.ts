import { Schema } from "mongoose";

export const LaboStaff= new Schema({
    userID : String,
    civility : String,
    firstName : String,
    lastName : String,
    PPR : Number,
    date : Date
  })
  