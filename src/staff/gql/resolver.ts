import Staff from '../controllers/staff';


export const staffResolver = {
    employerListAll : Staff.employerListAll,
    employerAddNew : Staff.employerAddNew,
    employerDelete : Staff.employerDelete,
    findEmployer : Staff.findEmployerByName,
    assignShiftsToEmployer : Staff.assignShiftsToEmployer,
    fetchAllShifts : Staff.listShifts,
    deleteShift : Staff.deleteShift,
}