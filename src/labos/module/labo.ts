import { Schema, model, Document} from 'mongoose';

type LaboModel = ILabo & Document;

const LaboCatalogListUpdateSchema = new Schema({
  userID : String,
  testReported : Number,
  testPrice : Number,
  testReferred : String,
  date : Date
})

const LaboCatalogListSchema = new Schema({

  testID : String,
  update : [LaboCatalogListUpdateSchema]

}, { strict: false }) 

const LaboCatalogSchema = new Schema( {
  list : [LaboCatalogListSchema]
})

const LaboSchema = new Schema({
  
    account: {
      name: {
        type: String
      },
      code: {
        type: Number
      }
    },

    contact: {

      tele: {

        fix: [String],

        fax: [String]

      },

      address: {

        region: {
          type: String
        },

        province: {
          type: String
        },

        commune: {
          type: String
        },

        street: {
          type: String
        }
      }
    },

    catalog : LaboCatalogSchema,

    orders : {

    },

    refferal : {

    },

    affiliate : {

    }

  });

  export const LABO = model<LaboModel>("LABO", LaboSchema)