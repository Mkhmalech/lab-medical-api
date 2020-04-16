import { LABO } from "../module/labo";
import { autoIncLabos } from "../../../../code-ittyni-api/src/controller/code";
import { Db } from "../../../../db-ittyni-api/src/db";

import jwt from "jsonwebtoken";

export class Labo {
  private Labo = new Db(LABO);

  // private LaboName ? : LabLaboAccountName;

  constructor() {
    // this.Labo.getAllFields();
    // this.insertManyLabosIntoDb(Laboss);
  }
  
  // Labo Info
  LaboListAll = ()=>{
    const labos : any = this.Labo.getAllFields();
    return labos;
  }

  // labo details
  getLaboByName = ({name} : any) => {
    const labo = this.Labo.getOneByQuery({"account.name" : name});
    return labo;
  }

  // Labo Catalog
  catalogTests = ({ catalogUpdate }: any) => {
    // 2 - very token of current user
    const userUpdateCatalog = jwt.verify(
      catalogUpdate.token,
      "mysuperTokenlogin"
    );
    // update or save all catalog test

    /* schema of entries **
          catalog : {
            list : [
              {
                "5dc3f2e86e6e3e21d027bed1" : [
                  { date , userID , price}
                ]
              }
            ]
          }
        */
    // });
    for (let i = 0; i < catalogUpdate.catalogList.length; i++) {
      this.selectLabo(catalogUpdate.laboName, async (labo: any) => {
        // console.log(labo.catalog.list[0])

        // if (userUpdateCatalog) {
        const { userId }: any = userUpdateCatalog;

        //   // 1- check if test is exist ? update : create new one

        const testIndex = labo.catalog.list.findIndex(
          (e: any) => e.testID === catalogUpdate.catalogList[i].testId
        );
        // console.log(catalogUpdate.catalogList[i].testId)
        if (testIndex <= 0) {
          // 4 - save and handle Errors
          // console.log(testIndex)
          labo.catalog.list.push({
            testID: catalogUpdate.catalogList[i].testId,
            update: [
              {
                userID: userId,
                testReported: catalogUpdate.catalogList[i].testReported,
                testPrice: catalogUpdate.catalogList[i].testPrice,
                testReferred:
                  catalogUpdate.catalogList[i].testReferred === "oui"
                    ? true
                    : false,
                date: new Date()
              }
            ]
          });

          labo.save((e: any) => {
            if (e) throw new Error(e);
          });
        } else {
          // let testId : any = catalogUpdate.catalogList[0].testId;
          // console.log(testIndex)
          // console.log(labo.catalog.list[testIndex])

          // labo.catalog.list.update({"_id" : id}, (e:any, r:any)=>{
          //   console.log(r)
          // })

          // console.log(testId);
          // console.log(labo.catalog.list[testIndex]['58bb5b7e69b23c2bab47bb00']);

          labo.catalog.list[testIndex].update.push({
            userID: userId,
            testReported: catalogUpdate.catalogList[i].testReported,
            testPrice: catalogUpdate.catalogList[i].testPrice,
            testReferred:
              catalogUpdate.catalogList[i].testReferred === "oui"
                ? true
                : false,
            date: new Date()
          });

          // delete labo.catalog.list[testIndex].key;
          // console.log(labo.catalog.list[testIndex])

          // labo.save((e : any, doc : any) =>{
          //   if(e) throw new Error(e);
          //   console.log(doc.catalog.list[0])
          // });

          labo.save((e: any) => {
            if (e) throw new Error(e);
          });
        }
        // } else {
        //   throw new Error("user not exist");
        // }

        // // catalogUpdate.catalogList.map((test : any)=> newCatalog.list.push(test))

        // console.log(labo.catalog.list.find((e:any) => e.key = catalogUpdate.catalogList[0].testId))
      });
    }
  };

  selectLaboCatalog = (cb: (lab: any) => void) => this.selectLabo;

  // Laboratory
  selectLabo = (laboName: string, cb: (lab: any) => any) =>
    this.Labo.getOneField("account.name", laboName, cb);

  catalogListTest = async ({ listTest }: any) => {
    const lastCatalog = await this.selectLabo(
      listTest.laboName,
      (labo: any) => {
        const testIndex = labo.catalog.list.findIndex(
          (e: any) => e.testID === listTest.testId
        );

        if (!testIndex) console.log(`we are not found ${listTest.testId}`);

        const testUpdates = labo.catalog.list[testIndex].update;

        const lasIndex = testUpdates[testUpdates.length - 1];

        return {
          testReported: lasIndex.testReported,
          testPrice: lasIndex.testPrice,
          testReferred: lasIndex.testReferred
        };
      }
    );

    // console.log(lastCatalog);

    return lastCatalog;
  };

  catalogListTests = async ({listTests} : any )=> {
    const lastCatalog : any = []
    // console.log(listTests)
    await this.selectLabo(
      listTests.laboName,
      (labo: any) => {

        listTests.updates.map(
          (listTest : any) =>{

            const testIndex = labo.catalog.list.findIndex(
              (e: any) => e.testID === listTest.testId
            );

            if (testIndex < 0) {
              lastCatalog.push({
                testId : listTest.testId,
                testName : listTest.testName,
                Bcode  : listTest.Bcode
              });
            }
            else {

            const testUpdates  = labo.catalog.list[testIndex].update;

            const lasIndex = testUpdates[testUpdates.length - 1];

            lastCatalog.push({
              testReported: lasIndex.testReported,
              testPrice: lasIndex.testPrice,
              testReferred: lasIndex.testReferred,
              testId : listTest.testId,
              Bcode  : listTest.Bcode,
              testName : listTest.testName
            });
          }
        }) 
      }
    );

    return lastCatalog;
  }

  findCatalogTest = async ({labTest} : any) => {
    let catalogTest : any ;
    await this.selectLabo(
      labTest.laboName,
      (labo : any) => {

        const testIndex = labo.catalog.list.findIndex(
          (e: any) => e.testID === labTest.testId
        );

        if (testIndex < 0) {
          
          catalogTest = {
            testId : labTest.testId,
            testName : labTest.testName,
            Bcode  : labTest.Bcode
          };
        }
        else {

          const testUpdates  = labo.catalog.list[testIndex].update;

            const lasIndex = testUpdates[testUpdates.length - 1];

            catalogTest = {
              testReported: lasIndex.testReported,
              testPrice: lasIndex.testPrice,
              testReferred: lasIndex.testReferred,
              testId : labTest.testId,
              Bcode  : labTest.Bcode,
              testName : labTest.testName
            };

        }
      }
    )

    return {...catalogTest};
  }

  findCatalogTests = async ({laboName} : any) => {
    let CatalogTests : any[] = [] ;

    await this.selectLabo(
      laboName, 
      (labo : any) =>{
        labo.catalog.list.map((test : any)=>{

          let lastIndex = test.update.length - 1;
          CatalogTests.push({
            testReported : test.update[lastIndex].testReported,
            testPrice : test.update[lastIndex].testPrice,
            testReferred : test.update[lastIndex].testReferred === 'true' ? "oui" : "non",
            testId : test.testID
          })
        })
      }
    )

    return CatalogTests
  }

  catalogTestUpdateOne = ({addUpdate}: any) => {

    let isSaved : boolean = false;

    const {laboName, catalogList, token} = addUpdate;

    // Check user ID
    const userUpdateCatalog = jwt.verify(
      token,
      "mysuperTokenlogin"
    );

    this.selectLabo(laboName, async (labo: any) => {

      // get user ID
        const { userId }: any = userUpdateCatalog;

      // 1- check if test is exist ? update : create new one
      const testIndex = labo.catalog.list.findIndex(
        (e: any) => e.testID === catalogList.testId
      );

      // 2- test not exist add to catalog list
      if(testIndex <= 0) {
        labo.catalog.list.push({
          testID : catalogList.testId,
          update : [{
            userID : userId,
            testReported : catalogList.testReported,
            testPrice : catalogList.testPrice,
            testReferred:
              catalogList.testReferred === "oui"
                    ? true
                    : false,
              date: new Date()
          }]
        })

        labo.save((e: any, r: any) => {
          if (e) throw new Error(e);
          isSaved = true;
        });


      } else {
      // 3- test exist update it 

      labo.catalog.list[testIndex].update.push({
        userID: userId,
        testReported: catalogList.testReported,
        testPrice: catalogList.testPrice,
        testReferred:
          catalogList.testReferred === "oui"
            ? true
            : false,
        date: new Date()
      });

      labo.save((e: any, r: any) => {
        if (e) throw new Error(e);
        isSaved = true;
      });

      }
    })

    return isSaved;

  }

  async insertManyLabosIntoDb(labos: any[]) {
    try {
      for (var i = 0; i < labos.length; i++) {
        let newLab = new LABO();

        newLab.account.name = labos[i].name;

        let code: number = await autoIncLabos();

        newLab.account.code = code;

        newLab.contact.tele.fix.push(labos[i].Fix);

        var fax: string | undefined;

        if (fax) {
          newLab.contact.tele.fax.push(fax);
        }

        newLab.contact.address.street = labos[i].address;

        newLab.contact.address.city = labos[i].city;

        await newLab.save();

        //   console.log(newLab);
      }
    } catch (err) {
      console.error(err.message);
    }
  }
}