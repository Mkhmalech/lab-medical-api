import { Schema } from "mongoose";
import mongoose from 'mongoose';

/**
 * labo departement hold all 
 */
export const laboSettingDepartement = new Schema({  name : String, date : String })
export const LaboSettingDeperatement = mongoose.model('labosettingdepartements', laboSettingDepartement)

/**
 * holiday when labo doesn't work
 * @data from, to, name
 */
export const laboSettingHoliday = new Schema({ holiday : String, from : String, to : String, createdAt : String })
export const LaboSettingHoliday = mongoose.model('labosettingholidays', laboSettingHoliday)
/**
 * leave is the personal vacation
 * 
 */
export const laboSettingLeave = new Schema({  leave : String, duration : Number, createdAt : String })
export const LaboSettingLeave = mongoose.model('labosettingleave', laboSettingLeave)
/**
 * labo automates
 */
export const laboSettingAutomate = new Schema({ brand : String, analyzer : String, entryDate : String, createdAt : String })
export const LaboSettingAutomate = mongoose.model('labosettingautomate', laboSettingAutomate)
