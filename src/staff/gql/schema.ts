import { buildSchema } from 'graphql';

const Employer = `
    type Employer {
        addedBy  : ID
        civility : String
        firstName : String
        lastName : String
        ppr : Int 
        departement : [String]
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