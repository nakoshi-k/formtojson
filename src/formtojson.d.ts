export as namespace formToJSON;

export = formToJSON;

declare function formToJSON(form:HTMLFormElement,split:string|RegExp,json?:boolean): formToJSON.response;

declare namespace formToJSON {
    export interface response {
        [key:string] : string | string[] | {[key:string] :string} |  {[key:string] :string}[]
    }
}