window["LightForm"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/file-support.ts":
/*!*****************************!*\
  !*** ./src/file-support.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fileSupport = (elements = document.querySelectorAll(`input[type="file"]`)) => [].slice.call(elements)
    .forEach((element) => {
    const parent = element.parentElement || { insertBefore: () => { } };
    const base64 = document.createElement("input");
    base64.name = element.name.replace(/^_/, "");
    base64.type = "hidden";
    parent.insertBefore(base64, element.nextSibling);
    const read = () => {
        if (element.files === null) {
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(element.files[0]);
        reader.onload = () => {
            base64.value = reader.result;
        };
    };
    read();
    element.addEventListener("change", read);
});
exports.default = fileSupport;


/***/ }),

/***/ "./src/get-constructor-name.ts":
/*!*************************************!*\
  !*** ./src/get-constructor-name.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const getConstructorName = instance => (instance.constructor) ? instance.constructor.name : Object.prototype.toString.call(instance).split(/\[\] /)[1];
exports.default = getConstructorName;


/***/ }),

/***/ "./src/get-fields.ts":
/*!***************************!*\
  !*** ./src/get-fields.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const getFields = (form) => [].slice.call(form.elements)
    .filter((e) => e.hasAttribute("name"))
    .map((e) => e.getAttribute("name") || "")
    .filter((s, index, ar) => index === ar.indexOf(s));
exports.default = getFields;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const to_form_1 = __importStar(__webpack_require__(/*! ./to-form */ "./src/to-form.ts"));
const to_object_1 = __importDefault(__webpack_require__(/*! ./to-object */ "./src/to-object.ts"));
const file_support_1 = __importDefault(__webpack_require__(/*! file-support */ "./src/file-support.ts"));
exports.default = {
    toForm: to_form_1.default,
    toObject: to_object_1.default,
    bracketed: to_form_1.bracketed,
    doted: to_form_1.doted,
    fileSupport: file_support_1.default
};


/***/ }),

/***/ "./src/to-form.ts":
/*!************************!*\
  !*** ./src/to-form.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_constructor_name_1 = __importDefault(__webpack_require__(/*! get-constructor-name */ "./src/get-constructor-name.ts"));
exports.bracketed = (parent, key) => (parent === "") ? key : `${parent}[${key}]`;
exports.doted = (parent, key) => (parent === "") ? key : `${parent}.${key}`;
exports.toFlat = (values, wrap = exports.bracketed, parent = "", flat = []) => {
    return Object.keys(values).reduce((flat, key) => {
        const value = values[key];
        if (Array.isArray(value)) {
            if (value[0] !== void 0 && typeof value[0] !== "object") {
                flat.push([wrap(parent, key), value]);
                return flat;
            }
        }
        if (typeof value === "object") {
            return exports.toFlat(values[key], wrap, wrap(parent, key), flat);
        }
        flat.push([wrap(parent, key), values[key]]);
        return flat;
    }, flat);
};
const setValueRadioNode = (radioNodeList, value) => {
    if (!Array.isArray(value)) {
        radioNodeList.value = value;
        return;
    }
    value.forEach((v, index) => {
        radioNodeList.item(index).value = v;
    });
};
const setValueSelect = (select, value) => {
    if (!select.multiple) {
        select.value = value;
    }
    ;
    [].slice.call(select.querySelectorAll("option")).forEach((option) => {
        option.selected = (value.indexOf(option.value) > -1) ? true : false;
    });
};
const bindForm = (form, flatData) => {
    flatData.forEach(row => {
        const key = row[0];
        const value = row[1];
        const formChild = form[key] || form[key + "[]"];
        if (formChild === void 0)
            return;
        if (get_constructor_name_1.default(formChild) === "RadioNodeList") {
            setValueRadioNode(formChild, value);
            return;
        }
        if (get_constructor_name_1.default(formChild) === "HTMLInputElement" && formChild.type === "checkbox") {
            formChild.checked = true;
            return;
        }
        if (get_constructor_name_1.default(formChild) === "HTMLSelectElement") {
            setValueSelect(formChild, value);
            return;
        }
        if (formChild.type === "file")
            return;
        formChild.value = value;
    });
    return form;
};
exports.default = (form, data, wrap) => {
    return bindForm(form, exports.toFlat(data, wrap));
};


/***/ }),

/***/ "./src/to-object.ts":
/*!**************************!*\
  !*** ./src/to-object.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_fields_1 = __importDefault(__webpack_require__(/*! get-fields */ "./src/get-fields.ts"));
const get_constructor_name_1 = __importDefault(__webpack_require__(/*! get-constructor-name */ "./src/get-constructor-name.ts"));
const getSelectValue = (select) => {
    if (!select.multiple) {
        return select.value;
    }
    const selected = select.querySelectorAll("option:checked");
    return [].slice.call(selected).map((opt) => opt.value);
};
const getRadioNodeListValue = (radioNodeList) => {
    if (radioNodeList.length === 0)
        return "";
    const firstElement = radioNodeList[0];
    if (firstElement.type === "checkbox") {
        const c = [].slice.call(radioNodeList)
            .filter((e) => e.checked)
            .map((e) => e.value);
        return c;
    }
    if (["checkbox", "radio"].indexOf(firstElement.type) === -1) {
        return [].slice.call(radioNodeList).map((e) => e.value);
    }
    return radioNodeList.value;
};
const getValue = (field, formChild) => {
    if (get_constructor_name_1.default(formChild) === "RadioNodeList") {
        return getRadioNodeListValue(formChild);
    }
    //multiple select
    if (get_constructor_name_1.default(formChild) === "HTMLSelectElement") {
        return getSelectValue(formChild);
    }
    return formChild.value;
};
const toHierarchyData = (fields, values, split) => {
    const hierarchyFields = fields.map(field => field.split(split).filter(floor => floor !== ""));
    const data = values.reduce((data, value, index) => {
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
    return data;
};
exports.default = (form, split = /[\[\]]+/) => {
    const fields = get_fields_1.default(form);
    const values = fields.map(field => getValue(field, form[field]));
    return toHierarchyData(fields, values, split);
};


/***/ })

/******/ })["default"];