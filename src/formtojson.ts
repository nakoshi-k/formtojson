
interface RadioNodeList extends NodeList{
    value : string
}

const getFields : (form:HTMLFormElement) => string[] = (form) => {
    return [].slice.call( form.elements )
        .filter( function(e:HTMLElement){return e.hasAttribute("name")})
        .map( function(e:HTMLElement){return e.getAttribute("name")} )
        .filter( function( s :string , index : number , ar : string[]){ return index === ar.indexOf(s)})
}


const getValue : (field :string , formChild :HTMLInputElement|HTMLSelectElement|RadioNodeList) => string | string[] = (field,formChild) => {
    
    let select =  <HTMLSelectElement>formChild
    if(select.tagName === "SELECT" && select.hasAttribute("multiple")){
        let value = []
        let selected = select.querySelectorAll("option:checked")
        value = [].slice.call(selected).map(function(opt : HTMLOptionElement){
            return opt.value;
        })
        return value 
    }

    let Nodes = <RadioNodeList>formChild
    if(typeof Nodes.length === "number" && field.substr(-2,2) === "[]"){
        Nodes = <RadioNodeList>formChild
        let value = []
        const firstElement = <HTMLInputElement>Nodes[0]
        if(firstElement.type === "checkbox"){
            value = [].slice.call(Nodes).filter(function(e : HTMLInputElement){
                return e.checked
            }).map(function(e:HTMLInputElement){return e.value})
        }else{
            value = [].slice.call(Nodes).map(function(e:HTMLInputElement){return e.value})
        }
        return value
    }else if(typeof Nodes.length === "number" && Nodes.item){
        let lastElement = <HTMLInputElement>Nodes[ Nodes.length -1 ]
        return lastElement.value
    }


    return formChild.value
}

const toHierarchyData = (fields : string[],values : (string|string[])[],split : string|RegExp) => {
    const data = {}
    fields.map(field => field.split(split).filter(floor => floor !== "") )
        .forEach( ( fieldsHierarchy , index ) => {
            const value = values[index]
            let swap : any = data
            fieldsHierarchy.forEach( (floor,index,fieldsHierarchy) => {
                if(!fieldsHierarchy[index + 1]){
                    swap[floor.replace("[]","")] = value
                    return
                }
                if(!swap[floor]){
                    if(!isNaN(parseInt(fieldsHierarchy[index + 1]))){
                        swap[floor] = [];
                    }else{
                        swap[floor] = {};
                    }
                }
                swap = swap[floor];
            } )
        });
    return data;
}

export default (form :HTMLFormElement , split : string|RegExp = "" , json = false) => {
    const fields = getFields(form);
    const values = fields.map( field => getValue( field , form[field]))
    if(json){
        return JSON.stringify(toHierarchyData(fields,values,split))
    }
    return toHierarchyData(fields,values,split)
}