import { TESTS } from "../module/labtests";
import { userFunc } from "../../../../user-medical-api/src";

export class LabTests {
  //Methods

  listAllTests = () =>
    TESTS.find().then((tests: any[]) => {
      return tests.map((test: any) => {
        return {
          ...test._doc,
          _id: test._doc._id.toString()
        };
      });
    });
  listAllTestsFr = () =>
    TESTS.find({ "name.fr": { $exists: true } }).then((tests: any[]) => {
      return tests.map((test: any) => {
        return {
          ...test._doc,
          id: test._doc._id.toString()
        };
      });
    });
  LabTestsFrFilterByNameAndMnemonic = async ({query} : any) => {

    let q = query;
    q = new RegExp(q, 'ig');

    const res = await TESTS.find({$or : [{"name.fr" : q}, {"reference.Mnemonic" : q}]});

    let result : any[] = [];

    res.map(test=>result.push(test));

    return([...result])
  };
  LabTestsEnFilterByName = (name : String) => {
    
    
    return ({

    })
  };
  LabTestView = async ({ name }: any) => {
    const test = await TESTS.findOne({ "name.en": name.en });
    if (!test) throw new Error("no test found");

    return {
      id: test._id.toString(),
      name: {
        en: test.name.en,
        fr: test.name.fr
      },
      reference: { ...test.reference },
      finance: [
        {
          Bcode: test.finance[0] ? test.finance[0].Bcode : null,
          country: test.finance[0] ? test.finance[0].country : null
        }
      ],
      specimen : {...test.specimen}
    };
  };
  LabTestFrView = async ({ name }: any) => {
    const test = await TESTS.findOne({ "name.fr": name });
    if (!test) throw new Error("no test found");

    return {
      id: test._id.toString(),
      name: {
        en: test.name.en,
        fr: test.name.fr
      },
      reference: { ...test.reference },
      finance: [
        {
          Bcode: test.finance[0] ? test.finance[0].Bcode : null,
          country: test.finance[0] ? test.finance[0].country : null
        }
      ],
      specimen : {...test.specimen}
    };
  };
  namesUpdate = async ({ names, user }: any) => {
    let updatingMsg: any = await TESTS.findOne({ "name.en": names.en })
      .then(async test => {
        if (!test) return new Error("No Test Found");

        const role = await userFunc.getUserRole(user.id);

        if (role === "m.khmalech@gmail.com") {
          test.name.fr = names.fr;

          test.save(err => {
            if (err) throw new Error(err);
            else return "Name fr updates Successfully by Admin";
          });
        } else {
          let update = {
            userId : user.id,
            name: {
              en: names.en,
              fr: names.fr
            },
            updatedAt: new Date()
          };

          test.updates.push(update);

          test.save((err: any) => {
            if (err) throw new Error(err);
            else return "Name fr updates Successfully";
          });
        }
      })
      .catch(e => {
        throw new Error(e);
      });

    if (!updatingMsg) return true;
  };
  classificationUpdate = async ({ name, classification, user }: any) => {
    const test = await TESTS.findOne({ "name.en": name });
    if (!test) return false;

    const role = await userFunc.getUserRole(user.id);

    if (role === "mkhmalech@gmail.com") {
      if (!test.classification) {
        test.classification = { ...classification };
      } else {
        test.classification = classification;
      }

      test.save(err => {
        if (err) throw new Error(err);
        else return "Name fr updates Successfully by Admin";
      });
    } else {
      let update = {
        userId : user.id,
        classification: { ...classification },
        updatedAt: new Date()
      };

      test.updates.push(update);

      test.save((err: any) => {
        if (err) throw new Error(err);
        else return "Name fr updates Successfully";
      });
    }
  };
  referenceUpdate = async ({ name, reference, user }: any) => {
    const test = await TESTS.findOne({ "name.en": name });
    if (!test) return false;

    const role = await userFunc.getUserRole(user.id);

    if (role === "m.khmalech@gmail.com") {
      test.reference.CPT = reference.CPT;
      test.reference.Mnemonic = reference.Mnemonic;

      test.save(err => {
        if (err) throw new Error(err);
        else return "Name fr updates Successfully by Admin";
      });
    } else {
      let update = {
        userId : user,
        reference: {
          code: reference.code,
          CPT: reference.CPT,
          Mnemonic: reference.Mnemonic
        },
        updatedAt: new Date(),
        user : user.email
      };

      test.updates.push(update);

      test.save((err: any) => {
        if (err) throw new Error(err);
        else return "Name fr updates Successfully";
      });
    }
  };
  financeUpdate = async ({ name, finance, user }: any) => {
    const test = await TESTS.findOne({ "name.en": name });
    if (!test) return false;

    const role = await userFunc.getUserRole(user.email);

    if (role === "m.khmalech@gmail.com") {
      const isExist = test.finance.findIndex(o => o.country === "Morocco");

      if (test.finance[isExist]) {
        test.finance[isExist].Bcode = finance.Bcode;
      } else {
        test.finance.push(finance);
      }
    } else {
      let update = {
        userId : user,
        finance: [
          {
            country: finance.country,
            Bcode: finance.Bcode
          }
        ],
        updatedAt: new Date()
      };

      test.updates.push(update);

      test.save((err: any) => {
        if (err) throw new Error(err);
        else return "Name fr updates Successfully";
      });
    }
  };
  specimenUpdate = async ({ name, specimen, user }: any) => {
    const test = await TESTS.findOne({ "name.en": name });
    if (!test) return false;

    const role = await userFunc.getUserRole(user.email);

    if (role === "m.khmalech@gmail.com") {
    } else {
    }
  };
  updateAll = async ({ names, reference, finance, preAnalytics, user }: any) => {
    const test = await TESTS.findOne({ "name.en": names.en });
    if (!test) return false;

    const role = await userFunc.getUserRole(user.id);

    if (role === "m.khmalech@gmail.com") {
      test.reference.CPT = reference.CPT;
      test.reference.Mnemonic = reference.Mnemonic;

      const isExist = test.finance.findIndex(o => o.country === "Morocco");

      if (test.finance[isExist]) {
        test.finance[isExist].Bcode = finance.Bcode;
      } else {
        test.finance.push(finance);
      }

      test.name.fr = names.fr;

      test.specimen = {
          nature : preAnalytics.sampleType,
          tubecolor : preAnalytics.sampleCollectorColor,
          numberoftube : preAnalytics.SampleCollectorQuantity,
          volumemin : preAnalytics.sampleVolumeMin    
      }
      
      test.save(err => {
        if (err) throw new Error(err);
        else return "Name fr updates Successfully by Admin";
      });
    } else {
      let update = {
        userId : user.id,
        names: {
          en: names.en,
          fr: names.fr
        },
        reference: {
          code: reference.code,
          CPT: reference.CPT,
          Mnemonic: reference.Mnemonic
        },
        finance: [
          {
            country: finance.country,
            Bcode: finance.Bcode
          }
        ],
        specimen : {
          nature : preAnalytics.sampleType,
          tubecolor : preAnalytics.sampleCollectorColor,
          numberoftube : preAnalytics.SampleCollectorQuantity,
          volumemin : preAnalytics.sampleVolumeMin          
        },
        updatedAt: new Date()
      };

      test.updates.push(update);

      test.save((err: any) => {
        if (err) throw new Error(err);
        else return "Name fr updates Successfully";
      });
    }
  };
  LabTestFrenchById = async ({id} : any) => {
    const test = await TESTS.findOne({ "_id": id });
    if (!test) throw new Error("no test found");

    return {
      id: test._id.toString(),
      name: {
        en: test.name.en,
        fr: test.name.fr
      },
      reference: { ...test.reference },
      finance: [
        {
          Bcode: test.finance[0] ? test.finance[0].Bcode : null,
          country: test.finance[0] ? test.finance[0].country : null
        }
      ]
    };
  }
  LabTestFrenchByIds = async ({ids} : any) => {

    let testFetchedByIds : any[] = [];

    for (let i = 0; i < ids.length; i++) {

      const test = await TESTS.findOne({ "_id": ids[i] });
      if (!test) throw new Error("no test found");

      testFetchedByIds.push({
          id: test._id.toString(),
          name: {
            en: test.name.en,
            fr: test.name.fr
          },
          reference: { ...test.reference },
          finance: [
            {
              Bcode: test.finance[0] ? test.finance[0].Bcode : null,
              country: test.finance[0] ? test.finance[0].country : null
            }
          ]
        })
    }
    

    return testFetchedByIds;
  }
  nameEnFilter = async ({ en }: any) => {
    let q = en;
    q = new RegExp(q, 'ig');

    const res = await TESTS.find({$or : [{"name.en" : q}, {"reference.Mnemonic" : q}]});

    let result : any[] = [];

    res.map(test=>result.push(test));

    return([...result])
  }
}