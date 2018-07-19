
interface RadioNodeList extends NodeList{
    value : string
}

const getFields : (form:HTMLFormElement) => string[] = (form) => {
    return [].slice.call( form.elements )
        .filter( (e:HTMLElement) => e.hasAttribute("name"))
        .map( (e:HTMLElement) => e.getAttribute("name") )
        .filter( ( s :string , index : number , ar : string[]) => index === ar.indexOf(s))
}


const getValue : (field :string , formChild :HTMLInputElement|HTMLSelectElement|RadioNodeList) => string | string[] = (field,formChild) => {
    
    //multiple select
    let select =  <HTMLSelectElement>formChild
    if(select.tagName === "SELECT" && select.hasAttribute("multiple") && field.substr(-2,2) === "[]"){
        let selected = select.querySelectorAll("option:checked")
        return [].slice.call(selected).map((opt : HTMLOptionElement) => opt.value)
    }

    //multiple input
    let Nodes = <RadioNodeList>formChild
    if(typeof Nodes.length === "number" && field.substr(-2,2) === "[]"){
        Nodes = <RadioNodeList>formChild
        const firstElement = <HTMLInputElement>Nodes[0]
        if(firstElement.type === "checkbox"){
            return [].slice.call(Nodes)
                .filter((e : HTMLInputElement) => e.checked )
                .map((e:HTMLInputElement) => e.value)
        }
        return [].slice.call(Nodes).map((e:HTMLInputElement) => e.value)
    }
        
    if(typeof Nodes.length === "number"){
        let lastElement = <HTMLInputElement>Nodes[ Nodes.length -1 ]
        return lastElement.value
    }

    return formChild.value
}

const toHierarchyData = (fields : string[],values : (string|string[])[],split : string|RegExp) => {
    const hierarchyFields = fields.map(field => field.split(split).filter(floor => floor !== ""))
    return values.reduce( (data,value,index) => {
        let swap :any = data
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
    
}

export default (form :HTMLFormElement , split : string|RegExp = "" , json = false) => {
    const fields = getFields(form);
    const values = fields.map( field => getValue( field , form[field]))
    if(json){
        return JSON.stringify(toHierarchyData(fields,values,split))
    }
    return toHierarchyData(fields,values,split)
}