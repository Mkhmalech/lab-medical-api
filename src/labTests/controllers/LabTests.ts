import { TESTS } from "../module/labtests";
import { userFunc } from "../../../../user_manager/src";
import { DEPARTMENTS } from "../module/departments";
const fs = require('fs');
export class LabTests {

  // fetching data of test 
  LabTestFrenchById = async ({ id }: any) => {
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
      ],
      specimen: { ...test.specimen },
      updates: test.updates
    };
  }
  LabTestFrenchByIds = async ({ ids }: any) => {

    let testFetchedByIds: any[] = [];

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

    const res = await TESTS.find({ $or: [{ "name.en": q }, { "reference.Mnemonic": q }] });

    let result: any[] = [];

    res.map(test => result.push(test));

    return ([...result])
  }
  fetchTestsByFirstLetter = async ({ letter }: any) => {
    let q = letter;
    q = new RegExp('^' + q, 'ig');

    const res = await TESTS.find({ "name.en": { $regex: q } });

    let result: any[] = [];

    res.map(test => result.push(test));

    return ([...result])
  }
  createTestsSiteMap = async () => {
    let sitmap: string = '';

    const res = await TESTS.find({ "name.fr": { $exists: true } }).then((n: any) => {
      if (n) {
        n.map((m: any) => {
          sitmap += `<url><loc>https://ittyni.com/actes-tarifs/nomenclature-actes-biologie-médicale/${m.reference.Mnemonic}</loc><lastmod>${new Date().toISOString()}</lastmod><priority>0.80</priority></url>`;
        })
      }
    })

    // console.log(sitmap)

    fs.writeFileSync(`./testSitemap.xml`, sitmap, (err: any, doc: any) => {
      if (err) throw err
      console.log(doc)
    });
  }
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
  /**
   * fetch twenty labtests
   */
  fetchTwentyLabTests_fr = () =>
    TESTS.find({ "name.fr": { $exists: true } }).then((tests: any[]) => {
      let newTests = [...tests]
      newTests = newTests.slice(0, 20).map(() =>
        newTests.splice(Math.floor(Math.random() * newTests.length), 1)[0]
      )
      return newTests.map((test: any) => {
        return {
          ...test._doc,
          id: test._doc._id.toString()
        };
      });
    });
  LabTestsFrFilterByNameAndMnemonic = async ({ query }: any) => {

    let q = query;
    q = new RegExp(q, 'ig');

    const res = await TESTS.find({ $or: [{ "name.fr": q }, { "reference.Mnemonic": q }] });

    let result: any[] = [];

    res.map(test => result.push(test));

    return ([...result])
  };
  LabTestsEnFilterByName = (name: String) => {


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
      specimen: { ...test.specimen }
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
      specimen: { ...test.specimen }
    };
  };
  /**
   * fetch test by abbr
   * @param param0 
   */
  LabTestFrViewByAbbr = async ({ abbr }: any) => {
    const test = await TESTS.findOneAndUpdate({ "reference.Mnemonic": abbr }, { $inc: { "views": 1 } });
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
      specimen: { ...test.specimen }
    };
  };
  // =====>>>>>> end of fetching test data 
  // update test data 
  namesUpdate = async ({ names, testId }: any, { user }: any) => {
    let updatingMsg: any = await TESTS.findById(testId)
      .then(async test => {
        if (!test) return new Error("test_not_founded");

        if (user.role === "supadmin") {
          if (names.fr) test.name.fr = names.fr;
          if (names.en) test.name.en = names.en;

          test.save((err: any) => {
            if (err) throw new Error(err);
            else return "Names_updates_successfully_by_admin";
          });
        } else {
          let update = {
            updatedBy: user.id,
            name: {
              en: names.en,
              fr: names.fr
            },
            updatedAt: new Date()
          };

          test.updates.push(update);

          test.save((err: any) => {
            if (err) throw new Error(err);
            else return "names_fr_updated_successfully";
          });
        }
      })
      .catch(e => {
        throw new Error(e);
      });

    if (!updatingMsg) return true;
  };
  classificationUpdate = async (args: any, { user }: any) => {
    const test = await TESTS.findById(args.id);
    if (!test) return false;

    let classification: any = this.filterData(args);

    if (user.role === "supadmin") {
      classification.departements && test.departements.push(classification.departements);
      classification.components && test.components.push(classification.components);
      classification.parameter && (test.parameter = classification.parameter);
      classification.group && (test.group = classification.group);
      classification.panel && (test.panel = classification.panel);
      classification.panel && (test.structure = classification.structure);

      test.save((err: any) => {
        if (err) throw new Error(err);
        else return "updated_Successfully_by_admin";
      });
    } else {
      let update = {
        updatedBy: user._id,
        departements: classification.departements,
        components: classification.components,
        parameter: classification.parameter,
        group: classification.group,
        panel: classification.panel,
        updatedAt: new Date()
      };

      test.updates.push(update);

      test.save((err: any) => {
        if (err) throw new Error(err);
        else return "updated_Successfully";
      });
    }
  };
  referenceUpdate = async ({ id, reference }: any, { user }: any) => {
    const test = await TESTS.findById(id);
    if (!test) return new Error("test_not_founded");
    let newRef = this.filterData(reference);
    if (user.role === "supadmin") {
      test.reference.CPT = newRef.CPT;
      test.reference.Mnemonic = newRef.Mnemonic;

      test.save((err: any) => {
        if (err) throw new Error(err);
        else return "reference_updates_successfully_by_admin";
      });
    } else {
      let update = {
        updatedBy: user,
        reference: {
          code: newRef.code,
          CPT: newRef.CPT,
          Mnemonic: newRef.Mnemonic
        },
        updatedAt: new Date(),
        user: user._id
      };

      test.updates.push(update);

      test.save((err: any) => {
        if (err) throw new Error(err);
        else return "reference_fr_updated_successfully";
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
        updatedBy: user,
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
  specimenUpdate = async ({ id, volume }: any, { user }: any) => {
    const test = await TESTS.findById(id);
    if (!test) return false;


    if (user.role === "m.khmalech@gmail.com") {
    } else {
    }
  };
  updateAll = async ({ names, reference, finance, preAnalytics }: any, { user }: any) => {
    let specimen = {
      nature: preAnalytics.sampleType,
      tubecolor: preAnalytics.sampleCollectorColor,
      numberoftube: preAnalytics.SampleCollectorQuantity,
      volumemin: preAnalytics.sampleVolumeMin
    }
    let Reference = {
      CPT: reference.CPT,
      Mnemonic: reference.Mnemonic,
    }
    let Names = {
      en: names.en,
      fr: names.fr
    }
    Reference = this.filterData(Reference);
    specimen = this.filterData(specimen);
    Names = this.filterData(Names);

    const test = await TESTS.findOne({ "name.en": names.en });
    if (!test) return false;


    if (user && user.role && user.role.name === 'supadmin') {
      const isExist = test.finance.findIndex(o => o.country === finance.country);
      if (test.finance[isExist]) {
        test.finance[isExist].Bcode = finance.Bcode;
      } else {
        test.finance.push(finance);
      }
      test.name.fr = Names.fr && Names.fr;
      test.reference = Reference;
      test.specimen = specimen;
    }

    // if (role === "m.khmalech@gmail.com") {
    //   test.reference.CPT = reference.CPT;
    //   test.reference.Mnemonic = reference.Mnemonic;

    //   const isExist = test.finance.findIndex(o => o.country === "Morocco");

    //   if (test.finance[isExist]) {
    //     test.finance[isExist].Bcode = finance.Bcode;
    //   } else {
    //     test.finance.push(finance);
    //   }

    //   test.name.fr = names.fr;

    //   test.specimen = {
    //       nature : preAnalytics.sampleType,
    //       tubecolor : preAnalytics.sampleCollectorColor,
    //       numberoftube : preAnalytics.SampleCollectorQuantity,
    //       volumemin : preAnalytics.sampleVolumeMin    
    //   }
    //   console.log(test);
    //   test.save(err => {
    //     if (err) throw new Error(err);
    //     else return "Name fr updates Successfully by Admin";
    //   });
    else {
      let update = {
        updatedBy: user._id,
        name: {
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
        specimen: {
          nature: preAnalytics.sampleType,
          tubecolor: preAnalytics.sampleCollectorColor,
          numberoftube: preAnalytics.SampleCollectorQuantity,
          volumemin: preAnalytics.sampleVolumeMin
        },
        updatedAt: new Date()
      };

      test.updates.push(update);
    }
    // save data
    const saved: any = await test.save((err: any) => {
      if (err) throw new Error(err);
      else return "test updated Successfully";
    });
    if (saved) return new Error("not_saved"); else return saved;
  };
  // ===========> en of update test

  // fetching update data 
  fetchUpdates = async (args: any, { user }: any) => {
    const res = (user.role === 'supadmin') ?
      await TESTS.find({ "updates.0": { $exists: true } }).populate('updates.updatedBy')
      : await TESTS.find({ "updates.updatedBy": user._id })
    if (res) return (res)
    else return Error("no_update_founded")
  }
  filterData = (data: any) => {
    let newData = data;
    for (const property in newData) {
      if (
        newData[property] == '' || newData[property] == 'null' || newData[property] == null ||
        newData[property] == 'undefined' || typeof (newData[property]) == 'undefined'
      ) {
        delete newData[property];
      }
    }
    return newData;
  }
  fetchUpdateById = async ({ id }: any) => {
    const res: any = await TESTS.findOne({ 'updates._id': id }).select('updates name _id');

    if (res) {
      const i = res.updates.findIndex((u: any) => u._id == id);

      let update = res.updates[i];

      update.testId = res._id;

      return (update)
    }
    else Error('no_update_founded')
  }
  // ========>>>>> end of fitching an update data 

  // modify an update
  modifyUpdate = async ({ id, names, reference, finance, preAnalytics }: any) => {
    let update = {
      'updates.$[i].specimen.nature': preAnalytics.sampleType,
      'updates.$[i].specimen.tubecolor': preAnalytics.sampleCollectorColor,
      'updates.$[i].specimen.numberoftube': preAnalytics.SampleCollectorQuantity,
      'updates.$[i].specimen.volumemin': preAnalytics.sampleVolumeMin,
      'updates.$[i].reference.CPT': reference.CPT,
      'updates.$[i].reference.Mnemonic': reference.Mnemonic
    }
    let newUpdate = this.filterData(update);

    let options = {
      arrayFilters: [{
        'i._id': id
      }]
    }

    const res: any = await TESTS.findOneAndUpdate(
      { '_id': '58bb5b7e69b23c2bab47bb17' },
      { $set: newUpdate },
      options
    );

    // this.modifyUpdateFinance("6102cca391d4ef4d28a6fdde", 200);

    if (res)
      return ("updated_successfully");
    else Error("update_not_saved")
  }
  modifyUpdateNames = async ({ testId, updateId, name }: any) => {
    let update = { 'updates.$[i].name.fr': name.fr };

    update = this.filterData(update);

    let options = {
      arrayFilters: [{
        'i._id': updateId
      }]
    }

    const res = await TESTS.findOneAndUpdate({ '_id': testId }, update, options);

    if (res) return ("updated_successfully")
    else return Error("not_updated")
  }
  modifyUpdateReference = async ({ testId, updateId, reference }: any) => {
    let update = {
      'updates.$[i].reference.CPT': reference.CPT,
      'updates.$[i].reference.Mnemonic': reference.Mnemonic
    };

    update = this.filterData(update);

    let options = {
      arrayFilters: [{
        'i._id': updateId
      }]
    }

    const res = await TESTS.findOneAndUpdate({ '_id': testId }, update, options);

    if (res) return ("updated_successfully")
    else return Error("not_updated")
  }
  modifyUpdateSpecimen = async ({ testId, updateId, specimen }: any) => {
    let update = {
      'updates.$[i].specimen.nature': specimen.sampleType,
      'updates.$[i].specimen.tubecolor': specimen.sampleCollectorColor,
      'updates.$[i].specimen.anticoagulant': specimen.SampleAnticoagulant,
      'updates.$[i].specimen.numberoftube': specimen.SampleCollectorQuantity,
      'updates.$[i].specimen.volumemin': specimen.sampleVolumeMin,
    };

    update = this.filterData(update);

    let options = {
      arrayFilters: [{
        'i._id': updateId
      }]
    }

    const res = await TESTS.findOneAndUpdate({ '_id': testId }, update, options);

    if (res) return ("updated_successfully")
    else return Error("not_updated")
  }
  modifyUpdateFinance = async ({ testId, updateId, finance }: any) => {
    const res = await TESTS.findOneAndUpdate({ '_id': testId }, {
      $set: { "updates.$[i].finance.$[j].Bcode": finance.Bcode }
    },
      {
        arrayFilters: [{
            'i._id': updateId
          },{
            'j._id': finance._id
          }
        ]
      }
    );
    return res ? "updated_successfully" : Error("not_updated")
  }
  // ====>>>>>> end of modify update

  // === Lab departements
  addDepartment = ({ depart, mnem, descript }: any, { user }: any) => {

    const newDepartment = new DEPARTMENTS({
      name: {
        fr: depart
      },
      mnemonic: mnem && mnem,
      description: {
        fr: descript && descript
      }
    })

    return newDepartment.save((e: any) => e ? Error("department_not_saved") : ("saved_successfully"))
  }

  fetchDepartments = async ({ user }: any) => await DEPARTMENTS.find();
}
