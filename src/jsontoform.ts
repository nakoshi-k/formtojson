
interface nested {
    [key:string] : string | string[] | nested
}

interface RadioNodeList extends NodeList{
    value : string
}


const getFields : (form:HTMLFormElement) => string[] = (form) => {
    return [].slice.call( form.elements )
        .filter( (e:HTMLElement) => e.hasAttribute("name"))
        .map( (e:HTMLElement) => e.getAttribute("name") )
        .filter( ( s :string , index : number , ar : string[]) => index === ar.indexOf(s))
}

const getValue : (data : nested , pathAr : string[]) => string | string[] | undefined = (data , pathAr) => {
    const d = data[ pathAr[0] ];
    if(d === void 0){
        return void 0
    }
    if( typeof d === "string" || Array.isArray(d) ){
        return d
    }
    return getValue( d ,pathAr.slice(1) )
}

const setValue : ( formControl : HTMLInputElement|HTMLSelectElement|RadioNodeList ,value : string| string[]) => void = ( formControl ,value) => {

    if(typeof value == "string"){
        formControl.value = value
        return
    }
    let select = <HTMLSelectElement>formControl
    if(select.tagName === "SELECT" && select.hasAttribute("multiple")){
        const query = value.reduce( (query,v,index) => {
            return `${query}${ () => { if(index > 0) return "," } }option[value="${v}"]`
        } , "")
        select.querySelectorAll(query).forEach((e:HTMLOptionElement) => {
            e.selected = true
        })
        return
    }
    
    let nodes = <RadioNodeList>formControl
    if(nodes.length !== void 0 ){
        const first = <HTMLInputElement>nodes[0]
        if(first.type === "checkbox"){ 
            nodes.forEach((node : HTMLInputElement) => {
                if(value.indexOf(node.value) > -1){
                    node.checked = true
                }
            })
            return
        }
        value.forEach((v,index) => {
            let e = <HTMLInputElement>nodes[index]
            if(e !== void 0){
                e.value = v
            }
        })
    }
}

const setValues = ( form : HTMLFormElement , data : nested , split : string | RegExp ) => {
    getFields(form).map( field => {
       return {
           control : form[field],
           value : getValue( data , field.split(split) )
       }
   }).forEach(c => {
        if(c.value === void 0){
            return
        }
        setValue( c.control , c.value )
   })
}

const c = {
    "a" : "a",
    "b" : {
        "a" : "a",
        "b" : "c"
    } 
}


