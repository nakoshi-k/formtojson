import getFields from "get-fields";
import getConstructorName from "get-constructor-name";

interface RadioNodeList extends NodeList {
    value: string;
}

const getSelectValue = (select:HTMLSelectElement) => {
    if(!select.multiple){
        return select.value
    }
    const selected = select.querySelectorAll("option:checked")
    return [].slice.call(selected).map((opt : HTMLOptionElement) => opt.value)
}


const getRadioNodeListValue = (radioNodeList :RadioNodeList) => {
    if(radioNodeList.length === 0 ) return ""
    const firstElement = <HTMLInputElement>radioNodeList[0]
    
    if(firstElement.type === "checkbox"){
        const c = [].slice.call(radioNodeList)
            .filter((e : HTMLInputElement) => e.checked )
            .map((e:HTMLInputElement) => e.value)
        return c
    }

    if(["checkbox","radio"].indexOf(firstElement.type) === -1){
        return [].slice.call(radioNodeList).map((e:HTMLInputElement) => e.value)
    }
    return radioNodeList.value
}

const getValue : (field :string , formChild :HTMLInputElement|HTMLSelectElement|RadioNodeList) => string | string[] = (field,formChild) => {
    
    if( getConstructorName(formChild) === "RadioNodeList"){
        return getRadioNodeListValue(<RadioNodeList>formChild)
    }

    //multiple select
    if(getConstructorName(formChild) === "HTMLSelectElement"){
        return getSelectValue(<HTMLSelectElement>formChild)
    }

    return formChild.value
}

const toHierarchyData = (fields : string[],values : (string|string[])[],split : string|RegExp) => {
    const hierarchyFields = fields.map(field => field.split(split).filter(floor => floor !== ""))
    const data = values.reduce( (data,value,index) => {
        let swap : any = data
        let h = hierarchyFields[index]
        h.forEach((floor,index,fieldsHierarchy) => {
            if(!fieldsHierarchy[index + 1]){
                swap[floor.replace("[]","")] = value
                return
            }
            if(!swap[floor]){
                swap[floor] = {};
                if(!isNaN(parseInt(fieldsHierarchy[index + 1]))){
                    swap[floor] = [];
                }
            }
            swap = swap[floor];
        })
        return data
    },{})
    return data;
}

export default (form :HTMLFormElement , split : string|RegExp = /[\[\]]+/ ) => {
    const fields = getFields(form);
    const values = fields.map( field => getValue( field , form[field]))
    return toHierarchyData(fields,values,split)
}