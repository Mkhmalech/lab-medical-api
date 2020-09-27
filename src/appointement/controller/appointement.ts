import { LABO } from "../../labos/module/labo";

export const createAppointement = ({appoint} : any, req: any) =>{
    try {

        LABO.findOne({'account.name' : 'FES'},(e:any, res:any)=>{
            if(e) throw new Error(e)
            if(res){
                if(appoint.details == '') delete appoint.details;

                res.appointements.push(appoint);

                res.save();
            }
        })

        return "succes"
    } catch(e) {
        console.log(e);
        return "appointment_not_saved"
    }

    
}

export const fetchAppointements = async (req : any) => {
    const res = await LABO.findOne({'account.name' : 'FES'})
                    .select('appointements').then((appoint:any)=>appoint.appointements)
    console.log(res)
    return res;
}