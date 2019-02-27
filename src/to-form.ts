import getFields from "get-fields";
import getConstructorName from "get-constructor-name";

export interface NestedValues{
    [key:string] : string|number|string[]|number[]|NestedValues|Object[]
}
type FlatDataRow = string|number|string[]|number[]
type FlatData = [string,FlatDataRow][]

export const bracketed = (parent : string,key : string|number) => 
    (parent === "") ? key : `${parent}[${key}]`

export const doted = (parent : string,key : string|number) => 
    (parent === "") ? key : `${parent}.${key}`


export const toFlat : ( values : NestedValues ,
                        wrap? : Function, 
                        parent? :string , 
                        flat? : FlatData) => FlatData = ( values  , wrap = bracketed , parent = "" , flat  = []) => {
        return Object.keys(values).reduce( (flat,key) => {
            const value = values[key];
            if(Array.isArray(value)){
                if( value[0] !== void 0 && typeof value[0] !== "object"){
                    flat.push([ wrap(parent,key) , <number[]|string[]>value ])
                    return flat
                }
            }
            if(typeof value === "object"){
                return toFlat(<NestedValues>values[key], wrap , wrap(parent,key) ,flat)
            }
            flat.push([ wrap(parent,key) , <string|number>values[key] ])
            return flat;
        } , flat)
}

const setValueRadioNode = (radioNodeList:RadioNodeList,value:FlatDataRow) => {
    if(!Array.isArray(value)){
        radioNodeList.value = <string>value
        return
    }
    (<string[]|number[]>value).forEach((v :number|string,index:number) => {
        (<HTMLInputElement>radioNodeList.item(index)).value = <string>v
    })
}

const setValueSelect = ( select : HTMLSelectElement,value : FlatDataRow) => {
    if(!select.multiple){
        select.value = <string>value
    }
    ;[].slice.call(select.querySelectorAll("option")).forEach((option :HTMLOptionElement) => {
        option.selected = ((<string[]>value).indexOf(option.value) > -1) ? true : false 
    })
}

const bindForm = (form:HTMLFormElement, flatData : FlatData) => {
    flatData.forEach(row => {
        const key = row[0]
        const value = row[1]
        const formChild  = form[key] || form[key+ "[]"]
        if(formChild === void 0) return

        if(getConstructorName(formChild) === "RadioNodeList"){
            setValueRadioNode(<RadioNodeList>formChild,value)
            return
        }
        
        if(getConstructorName(formChild) === "HTMLInputElement" && formChild.type === "checkbox"){
            formChild.checked = true;
            return
        }
        if(getConstructorName(formChild) === "HTMLSelectElement"){
            setValueSelect(formChild,value)
            return
        }
        formChild.value = value
    })    
}

export default ( form :HTMLFormElement ,data : NestedValues) => {
    bindForm(form,toFlat(data))
}
