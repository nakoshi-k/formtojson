"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_fields_1 = __importDefault(require("get-fields"));
const getMultipleSelectValue = (select) => {
    const selected = select.querySelectorAll("option:checked");
    return [].slice.call(selected).map((opt) => opt.value);
};
const getRadioNodeListValue = (radioNodeList) => {
    if (radioNodeList.length === 0)
        return "";
    const firstElement = radioNodeList[0];
    if (firstElement.type === "checkbox") {
        return [].slice.call(radioNodeList)
            .filter((e) => e.checked)
            .map((e) => e.value);
    }
    return [].slice.call(radioNodeList).map((e) => e.value);
};
const getConstructorName = instance => (instance.constructor) ? instance.constructor.name : Object.prototype.toString.call(instance).split(/\[\] /)[1];
const isMultipleSelect = (element) => element.tagName === "SELECT" && element.hasAttribute("multiple") && element.name.substr(-2, 2) === "[]";
const getValue = (field, formChild) => {
    if (getConstructorName(formChild) === "RadioNodeList") {
        console.log("nodeLIst");
        return getRadioNodeListValue(formChild);
    }
    //multiple select
    if (isMultipleSelect(formChild)) {
        return getMultipleSelectValue(formChild);
    }
    return formChild.value;
};
const toHierarchyData = (fields, values, split) => {
    const hierarchyFields = fields.map(field => field.split(split).filter(floor => floor !== ""));
    return values.reduce((data, value, index) => {
        let swap = data;
        let h = hierarchyFields[index];
        h.forEach((floor, index, fieldsHierarchy) => {
            if (!fieldsHierarchy[index + 1]) {
                swap[floor.replace("[]", "")] = value;
                return;
            }
            if (!swap[floor]) {
                swap[floor] = {};
                if (!isNaN(parseInt(fieldsHierarchy[index + 1]))) {
                    swap[floor] = [];
                }
            }
            swap = swap[floor];
        });
        return data;
    }, {});
};
exports.default = (form, split = /[\[\]]+/) => {
    const fields = get_fields_1.default(form);
    const values = fields.map(field => getValue(field, form[field]));
    return toHierarchyData(fields, values, split);
};
