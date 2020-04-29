export const LaboCatalog = `

input ListTest {
    testId   : String
    testName : String
    Bcode    : Int
    laboName : String
}

type Update {
    testId   : String
    testName : String
    Bcode    : Int
    testReported : Int
    testPrice    : Int
    testReferred : String
}

input update {
    testId   : String
    testName : String
    Bcode    : Int
    testReported : Int
    testPrice    : Int
    testReferred : String
}
input ListTests {
    laboName : String
    updates : [update]
}

type LaboCatalogListUpdate {
    testReported : Int
    testPrice    : Int
    testReferred : String
}

input CatalogList {
    testId : String
    testReported : Int
    testPrice : Int
    testReferred : String
}
    
input CatalogUpdate {
    laboName : String, 
    catalogList: [CatalogList], 
    token : String
}

input CatalogUpdateOne {
    laboName : String, 
    catalogList: CatalogList, 
    token : String
}

type LaboCatalog {

    laboCatalogListing (catalogUpdate : CatalogUpdate) : [LaboCatalogListUpdate]

    laboCatalogListTest (listTest : ListTest) : LaboCatalogListUpdate

    catalogListTests (listTests : ListTests) : [Update]

    findCatalogTest (labTest : ListTest) : Update

    findCatalogTests (laboName : String) : [Update]

    addupdateTest (addUpdate : CatalogUpdateOne) : String

}
`