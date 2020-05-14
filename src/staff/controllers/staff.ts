import { Labo } from "../../labos/controllers/labo";
import { LABO } from "../../labos/module/labo";

class Staff extends Labo {
  constructor() {
    super();
  }

  // add personal
  addPersonal = (
    accountName: string,
    { user, message, hasAuthorization }: any,
    cb: (r: any) => any
  ) => {
    if (message) {
      return message;
    } else {
      if (hasAuthorization(user, accountName)) {
        LABO.findOne({ "account.name": accountName }, (e, r) => {
          if (e) throw new Error(e);
          if (!r) throw new Error("account_not_founded");
          cb(r);
        });
      } else {
        return "not_allowed";
      }
    }
  };
  /**
   * find in staff
   **/
  findStaff = async (
    accountName: string,
    { user, message, hasAuthorization }: any
  ) => {
    if (message) {
      return message;
    } else {
      if (hasAuthorization(user, accountName)) {
        const res = await LABO.findOne({ "account.name": accountName });
        if (res) {
          return res;
        } else {
          return "not_founded";
        }
      } else {
        return "not_allowed";
      }
    }
  };
  /**
   *
   */
  employerListAll = async (args: any, req: any) => {
    const { accountName } = args;
    let staff: any[] = [];
    const resultat: any = await this.findStaff(accountName, req);
    if (typeof resultat === "string") {
      return [resultat];
    } else {
      resultat.staff.map((personal: any) => {
        staff.push({
          id: personal._id,
          civility: personal.civility,
          firstName: personal.firstName,
          lastName: personal.lastName,
          ppr: personal.ppr,
          departement: resultat.setting.departements.find(
            ({ _id }: any) => `${_id}` === `${personal.departementId}`
          ),
        });
      });
      return staff;
    }
  };
  /**
   * add employer
   */
  employerAddNew = async (args: any, req: any) => {
    const { employer } = args;
    try {
      const res = await this.addPersonal(employer.accountName, req, (r) => {
        employer.addedBy = req.user.userId;
        const dep = r.setting.departements.find(
          (ele: any) => ele.name === employer.departementName
        );
        employer.departementId = dep._id;
        employer.createdAt = new Date().toString();
        if (employer.departementId) {
          delete employer.departementName;
          delete employer.accountName;
        }
        r.staff.push(employer);
        r.save();
      });
      if (typeof res === "string") {
        return res;
      } else {
        return "success";
      }
    } catch (e) {
      console.log(e);
    }
  };
  /**
   * test populate
   */
  findEmployerByName = async (args: any, req: any) => {
    const { query } = args;
    let q = query;
    q = new RegExp(q, "ig");
    const result = await LABO.findOne({
      "account.name": "Centrale du CHU Hassan II",
    });
    if (result) {
      let employer: any = result.staff.filter((em: any) => em.firstName == q);
      console.log(employer);
    }
  };
  /**
   * assign shift to employer
   */
  assignShiftsToEmployer = async (args: any, req: any) => {
    try {
      const res = await this.addPersonal(args.accountName, req, (r) => {
        r.shifts.push({
          employerId : args.userId,
          addedBy: req.user.userId || "",
          departementId : args.departementId,
          mounth : args.mounth,
          year : args.year,
          type : args.type,
          days : args.days,          
          createdAt: new Date().toString(),
        });
        r.save();
      });
      if (typeof res === "string") {
        return res;
      } else {
        return "success";
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * list all shifts
   */
  listShifts = async (args: any, req: any) => {
    const { accountName } = args;
    let shifts: any[] = [];
    const resultat: any = await this.findStaff(accountName, req);
    if (typeof resultat === "string") {
      return [resultat];
    } else {
      resultat.shifts.map((shift: any) => {
        shifts.push({
          id: shift._id,
          addedBy: shift.addedBy,
          mounth: shift.mounth,
          year: shift.year,
          type: shift.type,
          days: shift.days,
          createdAt: shift.createdAt,
          employer: resultat.staff.find(
            ({ _id }: any) => `${_id}` === `${shift.employerId}`
          ),
          departement: resultat.setting.departements.find(
            ({ _id }: any) => `${_id}` === `${shift.departementId}`
          ),
        });
      });
      return shifts;
    }
  };
}

export default new Staff();
