export as namespace formtojson;

export = formtojson;

declare function formtojson(form:HTMLFormElement,split:string|RegExp,json?:boolean): formtojson.response;

declare namespace formtojson {
    export interface response {
        [key:string] : string | string[] | {[key:string] :string} |  {[key:string] :string}[]
    }
}