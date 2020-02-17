"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var course_1 = require("./course");
exports.Programs = mongoose_1["default"].Schema({
    name: String,
    ismajor: Boolean,
    electivecredits: Number,
    classes_required: [
        {
            course: course_1.course
        }
    ]
});
