import { Schema } from "mongoose";

/**
 * labo departement hold all 
 */
export const departement = new Schema({  name : String, date : String })

/**
 * holiday when labo doesn't work
 * @data from, to, name
 */
export const holiday = new Schema({ holiday : String, from : Date, to : Date, createdAt : Date })

/**
 * leave is the personal vacation
 * 
 */
export const leave = new Schema({  leave : String, from : Date, to : Date, createdAt : Date })

/**
 * labo automates
 */
export const Automate = new Schema({ brand : String, analyzer : String, departementId : String })
