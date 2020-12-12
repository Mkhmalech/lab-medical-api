import { LABO } from "../../labos/module/labo";
import { TESTS } from "../../labTests/module/labtests";
import { LABORDER } from '../module/orders'

export const insertOrder = async ({ order, patient }: any, { user }: any) => {

    const Order = await LABORDER.find({ OrderDate: new Date().toLocaleDateString() }).sort({ OrderTime: -1 });
    let convertDateToUCode = new Date().toLocaleDateString().split('/');
    let UOC: string = ''
    if (Order.length > 0) { UOC = Math.floor(Number(Order[0].OrderUniqueCode) + 1).toString(); }
    else { UOC = convertDateToUCode[2] + convertDateToUCode[0] + convertDateToUCode[1] + '00001'; }

    let newOrder = new LABORDER({
        OrderUniqueCode: UOC,
        OrderType: "referral",
        OrderedBy: user.userId,
        OrderDate: new Date().toLocaleDateString(),
        OrderTime: new Date().toLocaleTimeString(),
        OrderPriceTotal: order.OrderPriceTotal,
        panel: order.panel,
        patient: patient,
        laboratory: order.laboId,
        referredFrom: user.accountId || order.laboId
    })

    newOrder.OrderStatus.push({
        type: "created",
        createdAt: new Date().toLocaleString(),
        createdBy: user.userId
    })

    const res = await newOrder.save();
    if (res) return "order_created_successfully"
    else return "order_not_created"
}
export const insertCabinetOrder = async ({ order, patient }: any, { user }: any) => {

    const Order = await LABORDER.find({ OrderDate: new Date().toLocaleDateString() }).sort({ OrderTime: -1 });
    let convertDateToUCode = new Date().toLocaleDateString().split('/');
    let UOC: string = ''
    if (Order.length > 0) { UOC = Math.floor(Number(Order[0].OrderUniqueCode) + 1).toString(); }
    else { UOC = convertDateToUCode[2] + convertDateToUCode[0] + convertDateToUCode[1] + '00001'; }

    let newOrder = new LABORDER({
        OrderUniqueCode: UOC,
        OrderType: "referral",
        OrderedBy: user.userId,
        OrderDate: new Date().toLocaleDateString(),
        OrderTime: new Date().toLocaleTimeString(),
        OrderPriceTotal: order.OrderPriceTotal,
        panel: order.panel,
        patient: patient,
        laboratory: order.laboId,
        referredFromCabinet: user.accountId
    })

    newOrder.OrderStatus.push({
        type: "created",
        createdAt: new Date().toLocaleString(),
        createdBy: user.userId
    })

    const res = await newOrder.save();
    if (res) return "order_created_successfully"
    else return "order_not_created"
}

export const fetchReferredOrdersOut = async (args: any, { user }: any) => {
    const Order = await LABORDER.find({ $and: [
        {$or : [{ referredFrom: user.accountId }, {referredFromCabinet : user.accountId}]}, { OrderType: 'referral' }] })
        .sort({OrderDate : -1, OrderTime : -1 })
        .populate('laboratory')
        .select("id OrderUniqueCode OrderDate OrderTime laboratory OrderStatus patient")

    if (Order.length <= 0)
        return "no_referred_order_founded"
    else
        return (Order)
}

export const fetchReferredOrdersIn = async (args: any, { user }: any) => {
    const Order = await LABORDER.find({ $and: [{ laboratory: user.accountId }, { OrderType: 'referral' }] })
        .sort({OrderDate : -1, OrderTime : -1 })
        .populate('referredFrom referredFromCabinet')
        .select("id OrderUniqueCode OrderDate OrderTime referredFrom referredFromCabinet OrderStatus patient");

    if (Order.length <= 0)
        return "no_referred_order_founded"
    else
        return (Order)
}
export const referredOrdersDetails = async (args: any, { user }: any) => {
    const Order = await LABORDER.findOne({ OrderUniqueCode : args.orderId })
        .populate('referredFrom laboratory panel.testId');
    if (!Order)
        return "no_referred_order_founded"
    else
        return (Order)
}
export const referredOrdersChangeStatus = async (args: any, { user }: any) => {
    const Order = await LABORDER.findOne({ OrderUniqueCode : args.UOC })
        .select('OrderStatus')
        .then(async (status:any)=>{
            if(status){
                status.OrderStatus.push({
                    type: args.type,
                    createdAt: new Date().toLocaleString(),
                    createdBy: user.userId
                })
                const res = await status.save();
                if(res) return res.OrderStatus[res.OrderStatus.length-1]
                else return new Error("order_status_not_saved")
            } 
            else             
                return new Error("order_status_not_founded")
        })
    if (!Order)
        return new Error("no_referred_order_founded")
    else
        return (Order)
}