import { buildSchema } from 'graphql';
import { SettingSchema } from './settingSchema';

const Tele =`
    type Tele {
        fix : [String]
        fax : [String]
    }
`
const Account = `
    type Account {
        name : String
        code : Int
    }
`
const Address = `
    type Address {
        region : String
        province : String
        commune : String
        street : String
    }
`
const Contact = `
    ${Tele}
    ${Address}
    type Contact {
        tele : Tele
        address : Address
    }
`
const Labo = `

    ${Account}
    ${Contact}

    type LaboInfo {
        account : Account
        contact : Contact
    }
    type Labo {
        LaboInfoListAll : [LaboInfo]
    }
`
const LaboCatalog = `

    input ListTest {
        testId   : String
        testName : String
        Bcode    : Int
        laboName : String
    }

    type Update {
        testId   : String
        testName : String
        Bcode    : Int
        testReported : Int
        testPrice    : Int
        testReferred : String
    }

    input update {
        testId   : String
        testName : String
        Bcode    : Int
        testReported : Int
        testPrice    : Int
        testReferred : String
    }
    input ListTests {
        laboName : String
        updates : [update]
    }

    type LaboCatalogListUpdate {
        testReported : Int
        testPrice    : Int
        testReferred : String
    }

    input CatalogList {
        testId : String
        testReported : Int
        testPrice : Int
        testReferred : String
    }
        
    input CatalogUpdate {
        laboName : String, 
        catalogList: [CatalogList], 
        token : String
    }

    input CatalogUpdateOne {
        laboName : String, 
        catalogList: CatalogList, 
        token : String
    }

    type LaboCatalog {

        laboCatalogListing (catalogUpdate : CatalogUpdate) : [LaboCatalogListUpdate]

        laboCatalogListTest (listTest : ListTest) : LaboCatalogListUpdate

        catalogListTests (listTests : ListTests) : [Update]

        findCatalogTest (labTest : ListTest) : Update

        findCatalogTests (laboName : String) : [Update]

        addupdateTest (addUpdate : CatalogUpdateOne) : String

    }
`

export const LaboSchema = buildSchema(`

    ${LaboCatalog}    

    ${Labo}

    ${SettingSchema}

    type LaboQuery {
        catalog : LaboCatalog
        setting : LaboSetting
        LaboListAll : [LaboInfo]
        LaboDetails(name : String) : LaboInfo
    }

    type laboMutation {
        firstMut : String
    }

    schema {
        query : LaboQuery
        mutation : laboMutation
    }

`)

