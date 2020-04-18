import { Schema, model, Document } from "mongoose";
import { LaboStaff } from "../../staff/module/staff";
import * as settings from "./settings";

type LaboModel = ILabo & Document;

const LaboCatalogListUpdateSchema = new Schema({
  userID: String,
  testReported: Number,
  testPrice: Number,
  testReferred: String,
  date: Date,
});

const LaboCatalogListSchema = new Schema(
  {
    testID: String,
    update: [LaboCatalogListUpdateSchema],
  },
  { strict: false }
);

const LaboCatalogSchema = new Schema({
  list: [LaboCatalogListSchema],
});

const LaboSchema = new Schema({
  account: {
    name: {
      type: String,
    },
    code: {
      type: Number,
    },
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

  catalog: LaboCatalogSchema,

  orders: {},

  refferal: {},

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
  shift: {},

  /**
   * settings of labo holds data of holidays
   * and automates and data used by labo
   */
  setting: {
    departements: [settings.departement],
    holidays: [settings.holiday],
    leaves: [settings.leave],
    Automates: [settings.Automate],
  },
});

export const LABO = model<LaboModel>("LABO", LaboSchema);
