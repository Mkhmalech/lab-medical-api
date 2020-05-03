import { Schema } from "mongoose";

export const LaboStaff= new Schema({
    userID : String, // id in user collection
    civility : String, 
    addedBy : String, // createdBy
    firstName : String,
    lastName : String,
    ppr : Number, // number of employer
    departementId : String,
    createdAt : Date
  })
  