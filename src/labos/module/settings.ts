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
/**
 * labo permission gived to status by component
 */
export const permissionByComponent = new Schema({ componentName : String, create : Boolean, read : Boolean, update : Boolean, delete : Boolean  })
export const PermissionByComponent = mongoose.model('permissionByComponent', permissionByComponent)
/**
 * labo Team Status
 */
export const laboSettingTeam = new Schema({ role : String, permissions : [permissionByComponent] })
export const LaboSettingTeam = mongoose.model('labosettingteam', laboSettingTeam)