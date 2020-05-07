import { buildSchema } from 'graphql';

const Departement = `
    type Departement {
        name : String
    }
`
const Employer = `

    ${Departement}

    type Employer {
        addedBy  : ID
        civility : String
        firstName : String
        lastName : String
        ppr : Int 
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
        testPopulate : String
    }
`
const StaffMutation = `
    type StaffMutation {
        employerAddNew(employer : EmployerInput) : String
    }
`
export const staffSchema = buildSchema(`

    ${Employer} 

    ${inputEmployer} 

    ${StaffQuery}

    ${StaffMutation}

    schema {
        query : StaffQuery
        mutation : StaffMutation
    }    
`)