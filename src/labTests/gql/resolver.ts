import { LabTests } from "../controllers/LabTests"

const labTests = new LabTests()


export const LabTestsResolver = {

    AllLabTests_en: labTests.listAllTests,
    AllLabTests_fr: labTests.listAllTestsFr,
    fetchTwentyLabTests_fr: labTests.fetchTwentyLabTests_fr,
    LabTestView_en: labTests.LabTestView,
    LabTestView_fr: labTests.LabTestFrView,
    LabTestFrViewByAbbr: labTests.LabTestFrViewByAbbr,
    LabTestFrenchSearch: labTests.LabTestsFrFilterByNameAndMnemonic,
    LabTestNamesUpdate : labTests.namesUpdate,
    LabTestReferenceUpdate : labTests.referenceUpdate,
    LabTestFinanceUpdate : labTests.financeUpdate,
    LabTestClassificationUpdate : labTests.classificationUpdate,
    LabTestSpecimenUpdate : labTests.specimenUpdate,
    LabTestAllUpdate : labTests.updateAll,
    LabTestFrenchById : labTests.LabTestFrenchById,
    LabTestFrenchByIds : labTests.LabTestFrenchByIds,
    nameEnFilter : labTests.nameEnFilter
    

}