import mongoose, { Schema } from "mongoose"

/**
 * labo extension gived to status by component
 */
export const extensionSchema = new Schema({ componentName : String, create : Boolean, read : Boolean, update : Boolean, delete : Boolean  })
export const Extension = mongoose.model('extension', extensionSchema)