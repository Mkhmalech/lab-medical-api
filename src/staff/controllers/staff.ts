import { Labo } from '../../labos/controllers/labo';

class Staff extends Labo {



    constructor(){
        super();
    }

    employerListAll =async ()=>{
        const res = await this.selectLabo("Centrale du CHU Hassan II", (r)=>{
            return [...r.staff]
        })
        return(res)
    }

    employerAddNew = async (arg : any, {req} : any ) =>{

        const {user} = req, {employer} = arg;

        if(user){

            if(user.role === 'supadmin' || user.role==='director'){
                const res = await this.selectLabo("Centrale du CHU Hassan II", (r)=>{
                    employer.date = new Date().toISOString();
                    r.staff.push(employer);
                    r.save((e: string)=>{if(e) throw new Error(e)})
                    return("success");
                })
                return(res)
            }

        }
    }
}

export default new Staff();