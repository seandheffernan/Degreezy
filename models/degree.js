"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var semester_1 = require("./semester");
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
exports.degree = new Schema({
    semesters: [
        {
            semester: semester_1.semester
        }
    ]
});
