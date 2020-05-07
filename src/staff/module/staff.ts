import { Schema } from "mongoose";

export const LaboStaff= new Schema({
    userID : {type : Schema.Types.ObjectId, ref : 'USER'}, // id in user collection
    civility : String, 
    addedBy : {type : Schema.Types.ObjectId, ref : 'USER'}, // createdBy
    firstName : String,
    lastName : String,
    ppr : Number, // number of employer
    departementId : {type : Schema.Types.ObjectId, ref : 'LABO'},
    createdAt : Date
  })
  