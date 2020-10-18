import { buildSchema } from 'graphql';
import { Setting, LaboCatalog, departement, LaboTeam, LaboTeamQuery } from './schema/'

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
        _id : ID
        account : Account
        contact : Contact
    }
    type Labo {
        LaboInfoListAll : [LaboInfo]
        addNewAccountLab(
            name : String,
            Fix : String,
            fax : String,
            street : String,
            city : String
        ) : String
    }
`

export const LaboSchema = buildSchema(`

    ${LaboCatalog}    

    ${Labo}

    ${Setting}

    ${LaboTeam}

    ${LaboTeamQuery}

    type LaboQuery {
        catalog : LaboCatalog
        LaboListAll : [LaboInfo]
        LaboDetails(name : String) : LaboInfo
        searchLaboByName(query : String) : [Account]
        team : LaboTeamQuery
    }

    type laboMutation {
        setting : LaboSetting
        team : LaboTeam
        addNewAccountLab(
            name : String,
            Fix : String,
            fax : String,
            street : String,
            city : String
        ) : String
    }

    schema {
        query : LaboQuery
        mutation : laboMutation
    }

`)

