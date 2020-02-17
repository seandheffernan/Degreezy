"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
exports.course = mongoose_1["default"].Schema({
    coursecode: Number,
    coursenumber: Number,
    prerequisites: [
        {
            course: mongoose_1["default"].Schema.Types.ObjectID
        }
    ],
    corequisites: [
        {
            course: mongoose_1["default"].Schema.Types.ObjectID
        }
    ],
    name: String,
    requiredmajor: String
});
