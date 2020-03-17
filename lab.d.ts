/**
 *  Lab typings file
 * created by @khmamed
 * for @ittyni @backEnd
 * at 02/17/2020
 *
 */

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
}
