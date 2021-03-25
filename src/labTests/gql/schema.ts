import { buildSchema } from "graphql";

export const LabTestsSchema = buildSchema(`

    type Names {
        en : String!
        fr : String
    }

    type Reference {
        code : [Int!]
        CPT : Int
        Mnemonic : String
    }

    type Finance {
        country : String
        Bcode : Int
    }

    type Specimen {
        nature : [String]
        tubeColor : [String]
        anticoagulant : [String]
        numberoftube : Int
        volumemin : Int
    }

    type EnTest {
        id: ID
        name : Names
        reference : Reference
        finance : [Finance]
    }

    type FrTest {
        id : ID
        name : Names
        reference : Reference
        finance : [Finance]
        specimen : Specimen
    }

    input LabTestsNames { 
        en : String!
        fr : String
    }
    
    input LabTestsReference {
        code : [Int!]
        CPT : Int
        Mnemonic : String
    }

    input LabTestsFinance {
        country : String
        Bcode : Int
    }

    input LabTestsClassification {
        Panels : String
        LabDepartement : String!
        Molecule : String
    }

    input LabTestPreAnalytics {
        sampleType : [String] ,
        sampleCollectorColor : [String],
        SampleCollectorQuantity : Int ,
        sampleVolumeMin : Int
    }

    input User {
        id : String!
    }

    type LabTestsQuery {
        AllLabTests_en : [EnTest]
        AllLabTests_fr : [FrTest]
        fetchTwentyLabTests_fr : [FrTest]
        LabTestView_en( name : LabTestsNames ) : FrTest
        LabTestView_fr( name : String ) : FrTest
        LabTestFrViewByAbbr( abbr : String ) : FrTest
        LabTestFrenchSearch( query : String) : [FrTest]
        LabTestFrenchById (id : String ) : FrTest
        LabTestFrenchByIds (ids : [String] ) : [FrTest]

        nameEnFilter (en : String ) : [FrTest]
    }

    type LabTestsMutation {
        LabTestNamesUpdate (  names : LabTestsNames, user :  User) : Boolean
        LabTestReferenceUpdate ( name : String, reference : LabTestsReference, user : User ) : Boolean
        LabTestFinanceUpdate ( name : String, finance : LabTestsFinance, user : User ) : Boolean
        LabTestClassificationUpdate(name : String, classification : LabTestsClassification, user : User ) : Boolean

        LabTestAllUpdate ( 
            names : LabTestsNames,                      
            reference : LabTestsReference, 
            finance : LabTestsFinance,
            preAnalytics : LabTestPreAnalytics,
            user : User 
        ) : Boolean 
        createTestsSiteMap : String      
    }

    schema {
        query : LabTestsQuery
        mutation : LabTestsMutation
    }

`)