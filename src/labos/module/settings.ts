import { Schema } from "mongoose";

/**
 * labo departement hold all 
 */
export const departement = new Schema({  name : String, date : String })

/**
 * holiday when labo doesn't work
 * @data from, to, name
 */
export const holiday = new Schema({ holiday : String, from : String, to : String, createdAt : String })

/**
 * leave is the personal vacation
 * 
 */
export const leave = new Schema({  leave : String, duration : Number, createdAt : String })

/**
 * labo automates
 */
export const automate = new Schema({ brand : String, analyzer : String, setupDate : String, createdAt : String })
