import { Schema, model, Document } from "mongoose";

interface Reference {
  code: Number;
  Mnemonic: String;
  CPT: Number;
}

interface Names {
  en: String;
  fr?: String;
}

interface Finance {
  country: String;
  Bcode: Number;
}

interface Classification {
  Panels?: String;
  LabDepartement: String;
  Molecule: String;
}

interface Specimen {
  nature?: String[];
  tubeColor?: String[];
  anticoagulant?: String[];
  numberoftube?: Number;
  volumemin?: Number;
  stability?: {
    time: Number;
    temperature: Number;
  };
}

interface ITestModel extends Document {
  reference: Reference;
  name: Names;
  finance: Finance[];
  classification?: Classification;
  specimen?: Specimen;
  updates: update[];
}

interface update extends Partial<ITestModel> {
  updatedAt: Date;
  userId : String
}

const TestSchema: Schema = new Schema({
  name: {
    en: String,
    fr: String
  },
  reference: {
    code: { type: [Number], unique: true },
    Mnemonic: { type: String, unique: true },
    CPT: { type: Number, unique: true }
  },
  finance: [
    {
      country: String,
      Bcode: Number
    }
  ],

  classification: {
    Panels: { type: String },
    LabDepartement: { type: String },
    Molecule: { type: String }
  },

  specimen: {
    nature: { type: [String] },
    tubecolor: { type: [String] },
    anticoagulant: { type: [String] },
    numberoftube: { type: Number },
    volumemin: { type: Number },
    stability: {
      time: { type: Number },
      temperature: { type: Number }
    }
  },

  updates: []
});

export const TESTS = model<ITestModel>("TESTS", TestSchema);