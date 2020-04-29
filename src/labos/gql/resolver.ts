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
  setting : {
    // list
    listDepartement : labo.departementsListing,
    listHoliday : labo.holidaysListing,
    listLeave : labo.leavesListing,
    listAutomate : labo.automatesListing,

    // update 
    addDepartement : labo.addDepartement,
    addHoliday : labo.addHoliday,
    addLeave : labo.addLeave,
    addAutomate : labo.addAutomate,

  },

  LaboListAll : labo.LaboListAll,
  
  LaboDetails : labo.getLaboByName,
  
  searchLaboByName : labo.searchLaboByName
};
