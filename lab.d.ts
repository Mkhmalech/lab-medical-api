/**
 *  Lab typings file
 * created by @khmamed
 * for @ittyni @backEnd
 * at 02/17/2020
 *
 */
// Lab -----> Tests typing file <-----
/**
 * @nameoftes
 */
type LabTestNameFr = string;
type LabTestNameEn = string;

/**
 * @labtesReferance
 */
type LabTestReferenceCode = Number;
type LabTestReferenceMnemonic = string;
type LabTestReferenceCPT = Number;

/**
 * @labtestfinance
 */
type LabTestFinanceCountry = string;
type LabTestFinanceBcode = number;

/**
 * @labtestclassification
 */
type LabTestClassificationPanels = string;
type LabTestClassificationDepartement = string;
type LabTestClassificationMolecule = string;

/**
 * @labtestspicement
 */
type LabTestSpecimenNature = string;
type LabTestSpecimenTubeColor = string;
type LabTestSpecimenAnticoagulant = string;
type LabTestSpecimenNumberoftube = number;
type LabTestSpecimenVolumeMin = number;
type LabTestSpecimenStabilityTime = number;
type LabTestSpecimenStabilityTemperature = number;

interface LabTestReference {
  code: LabTestReferenceCode;
  Mnemonic: LabTestReferenceMnemonic;
  CPT: LabTestReferenceCPT;
}

interface LabTestNames {
  en: LabTestNameEn;
  fr?: LabTestNameFr;
}

interface LabTestFinance {
  country: LabTestFinanceCountry;
  Bcode: LabTestFinanceBcode;
}

interface LabTestClassification {
  Panels?: LabTestClassificationPanels;
  Departement: LabTestClassificationDepartement;
  Molecule: LabTestClassificationMolecule;
}

interface LabTestSpecimenStability {
  time: LabTestSpecimenStabilityTime;
  temperature: LabTestSpecimenStabilityTemperature;
}

interface LabTestSpecimen {
  nature?: LabTestSpecimenNature[];
  tubeColor?: LabTestSpecimenTubeColor[];
  anticoagulant?: LabTestSpecimenAnticoagulant[];
  numberoftube?: LabTestSpecimenNumberoftube;
  volumemin?: LabTestSpecimenVolumeMin;
  stability?: LabTestSpecimenStability
}

interface LabTest {
  reference?: LabTestReference;
  name?: LabTestNames;
  finance?: LabTestFinance[];
  classification?: LabTestClassification;
  specimen?: LabTestSpecimen;
}
interface LabTestWithUpdate extends LabTest {
  updates?: LabTest[];
}


// Lab -----> Labos typing file <-----

type LabLaboAccountName = string;
type LabLaboAccountCode = number;
type LabLaboContactTeleFix = string[];
type LabLaboContactTeleFax = string[];
type LabLaboContactAddressRegion = string;
type LabLaboContactAddressProvince = string;
type LabLaboContactAddressCity = string;
type LabLaboContactAddressCommune = string;
type LabLaboContactAddressStreet = string;

interface LabLaboAccount {
  name: LabLaboAccountName;
  code: LabLaboAccountCode;
}
interface LabLaboContactTele {
  fix: LabLaboContactTeleFix;
  fax: LabLaboContactTeleFax;
}
interface LabLaboContactAddress {
  region: LabLaboContactAddressRegion;
  province: LabLaboContactAddressProvince;
  city: LabLaboContactAddressCity;
  commune: LabLaboContactAddressCommune;
  street: LabLaboContactAddressStreet;
}
interface LabLaboContact {
  tele: LabLaboContactTele;
  address: LabLaboContactAddress;
}
interface LabLaboCatalogListTest {
  userID?: string;
  testReported: number;
  testPrice?: number;
  testReferred?: boolean;
  date?: Date;
}
interface LabLaboCatalogList {
  testID: string;
  update?: LabLaboCatalogListTest[];
}

interface LabLaboCatalog {
  list: LabLaboCatalogList[];
}

interface LabLaboOrder {}

interface LabLaboReferral {}

interface LabLaboAffiliate {}

interface LabLaboAgreements {}

interface LabLaboCertification {}

interface ILabo {
  account: LabLaboAccount;
  contact: LabLaboContact;
  catalog: LabLaboCatalog;
  order: LabLaboOrder;
  referral: LabLaboReferral;
  affiliate: LabLaboAffiliate;
  agreements: LabLaboAgreements;
  certification: LabLaboCertification;
  setting: {
    departements: any[],
    holidays: any[],
    leaves: any[],
    Automates: any[],
  },
}
