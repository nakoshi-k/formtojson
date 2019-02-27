export interface NestedValues {
    [key: string]: string | number | string[] | number[] | NestedValues | Object[];
}
declare type FlatDataRow = string | number | string[] | number[];
declare type FlatData = [string, FlatDataRow][];
export declare const bracket: (parent: string, key: string | number) => string | number;
export declare const toFlat: (values: NestedValues, wrap?: Function, parent?: string, flat?: FlatData) => FlatData;
declare const _default: (form: HTMLFormElement, data: NestedValues) => void;
export default _default;
//# sourceMappingURL=to-form.d.ts.map