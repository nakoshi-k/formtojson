"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getFields = function (form) {
    return [].slice.call(form.elements)
        .filter(function (e) { return e.hasAttribute("name"); })
        .map(function (e) { return e.getAttribute("name"); })
        .filter(function (s, index, ar) { return index === ar.indexOf(s); });
};
var getValue = function (field, formChild) {
    //multiple select
    var select = formChild;
    if (select.tagName === "SELECT" && select.hasAttribute("multiple") && field.substr(-2, 2) === "[]") {
        var selected = select.querySelectorAll("option:checked");
        return [].slice.call(selected).map(function (opt) { return opt.value; });
    }
    //multiple input
    var Nodes = formChild;
    if (typeof Nodes.length === "number" && field.substr(-2, 2) === "[]") {
        Nodes = formChild;
        var firstElement = Nodes[0];
        if (firstElement.type === "checkbox") {
            return [].slice.call(Nodes)
                .filter(function (e) { return e.checked; })
                .map(function (e) { return e.value; });
        }
        return [].slice.call(Nodes).map(function (e) { return e.value; });
    }
    if (typeof Nodes.length === "number") {
        var lastElement = Nodes[Nodes.length - 1];
        return lastElement.value;
    }
    return formChild.value;
};
var toHierarchyData = function (fields, values, split) {
    var hierarchyFields = fields.map(function (field) { return field.split(split).filter(function (floor) { return floor !== ""; }); });
    return values.reduce(function (data, value, index) {
        var swap = data;
        var h = hierarchyFields[index];
        h.forEach(function (floor, index, fieldsHierarchy) {
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
exports.formToJSON = function (form, split) {
    if (split === void 0) { split = ""; }
    var fields = getFields(form);
    var values = fields.map(function (field) { return getValue(field, form[field]); });
    return toHierarchyData(fields, values, split);
};
