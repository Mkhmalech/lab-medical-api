const departement = `
    departement : String
`
const holiday = `
    holiday : String
    from : String
    to : String
`
const leave = `
    leave : String
    from : String
    to : String
`
const automate = `
    brand : String
    analyzer : String
    departementId : String
`
const types = `
    type holiday { ${holiday} }
    type departement { ${departement} }
    type leave { ${leave} }
    type automate { ${automate} }
`
const inputs = `
    input Holiday { ${holiday} }
    input Departement { ${departement} }
    input Leave { ${leave} }
    input Automate { ${automate} }
`
export const SettingSchema = `

    ${types}

    ${inputs}

    type LaboSetting {

        listDepartement : [departement]
        listHoliday : [holiday]
        listLeave : [leave]
        listAutomate : [automate]

        addHoliday (holiday : Holiday) : String
        addDepartement (departement : Departement) : String
        addLeave (leave : Leave): String
        addAutomate (automate : Automate) : String
    }
`