import { buildSchema } from 'graphql';

const Departement = `
    type Departement {
        name : String
        _id : ID
    }
`

const Employer = `

    ${Departement}

    type Employer {
        id : ID
        addedBy  : ID
        civility : String
        firstName : String
        lastName : String
        ppr : Int 
        departement : Departement
    }
`

const shift = `
    type Shift {
        id: ID,
        mounth: Int,
        year: Int,
        type: String,
        days : [Int],
        addedBy: ID,
        createdAt: String,
        employer: Employer,
        departement : Departement
    }
`
const inputEmployer = `
    input EmployerInput {
        civility : String
        firstName : String
        lastName : String
        ppr : Int
        departementName : String
        accountName : String
    }
`

const StaffQuery = `
    type StaffQuery {
        employerListAll(accountName : String) : [Employer]
        findEmployer(query : String) : Employer
        fetchAllShifts(accountName : String) : [Shift]
    }
`

const StaffMutation = `
    type StaffMutation {
        employerAddNew(employer : EmployerInput) : String
        assignShiftsToEmployer(userId : ID, type : String, days : [Int], mounth: Int, year: Int, departementId: ID, accountName : String): String
    }
`

export const staffSchema = buildSchema(`

    ${Employer} 

    ${inputEmployer} 

    ${StaffQuery}

    ${StaffMutation}

    ${shift}

    schema {
        query : StaffQuery
        mutation : StaffMutation
    }    
`)