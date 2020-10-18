import { buildSchema } from "graphql"

const testId = `testId : ID`
const testPrice = `testPrice : String`
//  OrderedBy
const OrderPriceTotal = `OrderPriceTotal : Int`
const OrderUniqueCode = `OrderUniqueCode : String`
const OrderDate = `OrderDate : String`
const OrderTime = `OrderTime : String`
const civility = `civility : String`
const firstname = `firstname : String`
const lastname = `lastname : String`
const birthday = `birthday : String`
const documentIDNumber = `documentIDNumber : String`
const documentIDType = `documentIDType : String`
const laboId = `laboId : ID`

const referredFrom = `referredFrom : ID`

const panel = `{
    ${testId}
    ${testPrice}
}`
const status = `{type : String}`
const patient = `{
    ${civility}
    ${firstname}
    ${lastname}
    ${birthday}
    ${documentIDNumber}
    ${documentIDType}
}`

export const labOrdersSchema = buildSchema(`

    type Account {
        name : String
    }
    type Labo {
        _id : ID
        account : Account
    }

    input panelInput ${panel}
    input patienInput ${patient}

    input OrderInput { 
        ${OrderPriceTotal}
        ${laboId}
        panel : [panelInput]
    }
    type Patient ${patient}
    type Status ${status}
    type Name {
        fr : String
    }
    type TestId {
        name : Name
    }
    type Panel {
        testId : TestId
        testPrice : Int
    }
    type Order {
        _id : ID
        ${OrderUniqueCode}
        ${OrderDate}
        ${OrderTime}
        laboratory : Labo
        referredFrom : Labo
        OrderStatus : [Status]
        patient : Patient
    }
    type OrderDetails {
        _id : ID
        ${OrderUniqueCode}
        ${civility}
        ${OrderDate}
        ${OrderTime}
        ${OrderPriceTotal}
        panel : [Panel]
        laboratory : Labo
        referredFrom : Labo
        OrderStatus : [Status]
        patient : Patient
    }
    type NewStatus ${status}
    type orderQuery {
        fetchReferredOrdersIn : [Order]
        fetchReferredOrdersOut : [Order]
    }

    type orderMut {
        insertOrder(order : OrderInput, patient : patienInput) : String
        referredOrdersDetails(orderId : String) : OrderDetails 
        referredOrdersChangeStatus(UOC : String, type : String) : NewStatus
    }

    schema {
        query : orderQuery
        mutation : orderMut
    }  
`)