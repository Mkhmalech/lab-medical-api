import Staff from '../controllers/staff';


export const staffResolver = {
    employerListAll : Staff.employerListAll,
    employerAddNew : Staff.employerAddNew,
    findEmployer : Staff.findEmployerByName,
    assignShiftsToEmployer : Staff.assignShiftsToEmployer,
    fetchAllShifts : Staff.listShifts
}