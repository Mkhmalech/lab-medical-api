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
    let staff : any[] = [];
    const resultat: any = await this.findStaff(accountName, req);
    if (typeof resultat === "string") {
      return [resultat];
    } else {
      
      resultat.staff.map((personal : any)=>{
        staff.push({
          id: personal._id,
          civility:personal.civility ,
          firstName:personal.firstName ,
          lastName:personal.lastName ,
          ppr:personal.ppr ,
          departement : resultat.setting.departements.find((e:any)=>e._id = personal.departementId)
        })
      });
      return staff;
    }
  };
  /**
   * add employer
   */
  employerAddNew = async (args: any, req : any) => {
    const { employer } = args;
    try {
      const res = await this.addPersonal(
        employer.accountName,
        req,
        (r) => {
          employer.addedBy = req.user.userId;
          const dep = r.setting.departements.find((ele:any) => ele.name === employer.departementName);
          employer.departementId = dep._id;
          employer.createdAt = new Date().toString();
          if(employer.departementId) {delete employer.departementName; delete employer.accountName;}
          r.staff.push(employer)
          r.save();
        }
      );
      if(typeof res === "string"){
        return res
      } else {
        return "success"
      }
    } catch (e) {
      console.log(e);
    }
  };
  /**
   * test populate
   */
  testPopulate = async () => {
    const result = await LABO.findOne({'account.name' : "Centrale du CHU Hassan II"});
    if(result) {
      let staff : any[] = [];
      result.staff.map((personal : any)=>{
        staff.push({
          id: personal._id,
          civility:personal.civility ,
          firstName:personal.firstName ,
          lastName:personal.lastName ,
          ppr:personal.ppr ,
          departement : result.setting.departements.find((e:any)=>e._id = personal.departementId)
        })
      });

      console.log(staff)
    }
  }
}

export default new Staff();