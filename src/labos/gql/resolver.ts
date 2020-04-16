import { Labo } from "../controllers/labo";

const labo = new Labo();

export const LaboResolver = {
  catalog: {
    laboCatalogListing: labo.catalogTests,
    laboCatalogListTest: labo.catalogListTest,
    catalogListTests: labo.catalogListTests,
    findCatalogTest: labo.findCatalogTest,
    findCatalogTests: labo.findCatalogTests,
    addupdateTest: labo.catalogTestUpdateOne    
  },
  LaboListAll: labo.LaboListAll,
  LaboDetails     : labo.getLaboByName
};
