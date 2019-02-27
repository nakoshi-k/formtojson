"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const to_form_1 = __importDefault(require("./to-form"));
const to_object_1 = __importDefault(require("./to-object"));
exports.default = {
    toForm: to_form_1.default,
    toObject: to_object_1.default
};
