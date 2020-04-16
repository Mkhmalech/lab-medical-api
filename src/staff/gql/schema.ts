import { buildSchema } from 'graphql';

const Employer = `
    type Employer {
        name
    }
`

const StaffQuery = `
    type StaffQuery {
        employerListAll : String
    }
`
const StaffMutation = `
    type StaffMutation {
        employerAddNew(name : String) : String
    }
`
export const staffSchema = buildSchema(`

    ${StaffQuery}

    ${StaffMutation}

    schema {
        query : StaffQuery
        mutation : StaffMutation
    }    
`)