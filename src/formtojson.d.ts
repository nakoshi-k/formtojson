export as namespace formtojson;

export = formtojson;

declare function formtojson(name: string): formtojson.response;

declare namespace formtojson {
    export interface response {
        [key:string] : string | string[] | {[key:string] :string} |  {[key:string] :string}[]
    }
}