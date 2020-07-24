import { buildSchema } from 'graphql';
import { Setting, LaboCatalog, departement, LaboTeam } from './schema/'

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

export const LaboSchema = buildSchema(`

    ${LaboCatalog}    

    ${Labo}

    ${Setting}

    ${LaboTeam}

    type LaboQuery {
        catalog : LaboCatalog
        LaboListAll : [LaboInfo]
        LaboDetails(name : String) : LaboInfo
        searchLaboByName(query : String) : [Account]
    }

    type laboMutation {
        setting : LaboSetting
        team : LaboTeam
    }

    schema {
        query : LaboQuery
        mutation : laboMutation
    }

`)

