import formToJSON from "../src/formtojson"
import chai from "chai"
import assert from "assert"

const form = <HTMLFormElement>document.getElementById("form")
const form2 = <HTMLFormElement>document.getElementById("form2")

const data = formToJSON(form ,/[\[\]]+/);
const dataDot = formToJSON(form2 ,".");

const checkData = {
  name: 'kei',
  age: '42',
  sex: 'woman',
  job: 'worker',
  hobby: ['music' , "movie"],
  private: 'true',
  child: [ 'taro', 'hanako', 'jiro' ],
  animal: 'shiro',
  other: { qustion1: 'anser1', qustion2: 'anser2', qustion3: 'anser3' },
  other2:
   [ { qustion1: 'anser1' },
     { qustion2: 'anser2' },
     { qustion3: 'anser3' } ]
}

describe('test', () => {
    describe('#form parse', () =>  {
        it('like laravel', () =>  {
            assert.deepEqual(data , checkData)
        });
        it("like cakephp" , () => {
            assert.deepEqual(dataDot , checkData)
        })
        it("form1 form2 comparison" , () => {
            assert.deepEqual(dataDot , data)
        })
    });
});