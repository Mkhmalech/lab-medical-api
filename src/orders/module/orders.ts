import { Schema, model, Document } from "mongoose";

type LabOrderModel = iOrder & Document

interface iOrder {
    
    OrderUniqueCode : string
    OrderedBy : string
    OrderDate : string
    OrderTime : string
    OrderPriceTotal : number
    OrderStatus : any[]
         /* payed
        */
    
    patient? : any
    laboratory ?: any
    referredFrom? : any
    sample? : {
        /**
         * sampleType
         * sampleCondition
         * samplePriseTime
         * phlebotomistId
         * 
        */
    }
    panel? : any[]
} 

const LabOrderStatus = new Schema({
    type : String, 
    // "created" || "sent" || "recieved" || "performed" || "validated_partially" 
    // || "validated" || "cancelled" || "deleted"
    createdAt : String,
    createdBy : { type: Schema.Types.ObjectId, ref: 'USER' }
})
const LabOrderPanel = new Schema({
    testId : { type: Schema.Types.ObjectId, ref: 'TESTS' },
    testPrice : Number
})
export const LabOrder = new Schema({
    OrderUniqueCode : String,
    OrderType : String,
    OrderedBy : { type: Schema.Types.ObjectId, ref: 'USER' },
    OrderDate : String,
    OrderTime : String,
    OrderPriceTotal : Number,
    OrderStatus : [LabOrderStatus],
    patient : {
        civility : String,
        firstname : String,
        lastname : String,
        birthday : String,
        documentIDNumber : String,
        documentIDType : String,
    },
    laboratory : { type: Schema.Types.ObjectId, ref: 'LABO' },
    referredFrom : { type: Schema.Types.ObjectId, ref: 'LABO' },
    sample : {},
    panel : [LabOrderPanel]
})

export const LABORDER = model<LabOrderModel>('LABORDER', LabOrder)