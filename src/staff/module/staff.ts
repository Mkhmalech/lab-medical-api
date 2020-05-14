import { Schema } from "mongoose";

export const LaboStaff= new Schema({
    userID : {type : Schema.Types.ObjectId, ref : 'USER'}, // id in user collection
    civility : String, 
    addedBy : {type : Schema.Types.ObjectId, ref : 'USER'}, // createdBy
    firstName : String,
    lastName : String,
    ppr : Number, // number of employer
    departementId : {type : Schema.Types.ObjectId, ref : 'LABO'},
    createdAt : String
  })

export const LaboShift = new Schema({
  userID : {type : Schema.Types.ObjectId, ref : 'USER'},
  addedBy : {type : Schema.Types.ObjectId, ref : 'USER'},
  employerId : {type : Schema.Types.ObjectId},
  departementId : {type : Schema.Types.ObjectId},
  mounth : Number,
  year : Number,
  type : String,
  days : [Number],
  createdAt : String
})
  