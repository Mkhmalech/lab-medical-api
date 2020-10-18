import { Schema, model, Document } from "mongoose";
import { Appointement } from "../../appointement/module/appointement";
import { LaboStaff, LaboShift } from '../../staff/module/staff';
import { extensionSchema } from "./extension";
import * as settings from "./settings";

type LaboModel = ILabo & Document;

const LaboCatalogListUpdateSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: 'USER' },
  testReported: Number,
  testPrice: Number,
  testReferred: Boolean,
  createdAt: String,
});

const LaboCatalogListSchema = new Schema(
  {
    testId: { type: Schema.Types.ObjectId, ref: 'TESTS' },
    testReported: Number,
    testPrice: Number,
    testReferred: Boolean,
    update: [LaboCatalogListUpdateSchema],
  },
  { strict: false }
);

const LaboCatalogSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: 'USER' },
  title : String,
  description : String,
  bFactor: Number,
  addressedTo : String,
  addressedToId : { type: Schema.Types.ObjectId },
  list: [LaboCatalogListSchema],
});


const LaboSchema = new Schema({
  account: {
    name: {
      type: String,
    },
    code: {
      type: Number,
    }
  },

  contact: {
    tele: {
      fix: [String],

      fax: [String],
    },

    address: {
      region: {
        type: String,
      },

      province: {
        type: String,
      },

      commune: {
        type: String,
      },

      street: {
        type: String,
      },
    },
  },

  /**
   * price for contributors, pros
   * and affiliates
   */
  catalogs: [LaboCatalogSchema],

  /**
   * all lab orders
   * goes here
   */
  orders: {},

  /**
   * orders inteLabs goes here
   */
  refferal: {},

  /**
   * contributors are pro accounts that 
   * send orders to lab
   */
  contributors : [],

  /**
   * is for both professional and non professional Health
   * affiliate person can send orders to lab and get
   * commissions
   */
  affiliate: {},

  /**
   * laboratoire staff that hold all
   * about labo staff
   */
  staff: [LaboStaff],

  /**
   * if manager create account
   * for an employer we will move
   * employer data to user collection
   * and move labo activities to subcollection
   * like shfits parameters and others
   */
  shifts: [LaboShift],

  /**
   * settings of labo holds data of holidays
   * and automates and data used by labo
   */
  setting: {
    // name of laboratory departements
    departements: [settings.laboSettingDepartement],

    // holidays of labortory
    holidays: [settings.laboSettingHoliday],

    // employed leaves vacance not dispo in this time
    leaves: [settings.laboSettingLeave],

    // what automate the labo has
    automates: [settings.laboSettingAutomate],

    // status of team that labo has
    team: [settings.laboSettingTeam]
  },
  /**
   * activated modules
   */
  extensions : [extensionSchema],
  /**
   * clients appointement
  */
  appointements : [Appointement]
});

export const LABO = model<LaboModel>("LABO", LaboSchema);
