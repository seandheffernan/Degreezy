"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1["default"].connect("mongodb+srv://test:kuzmin@cluster0-djdw5.mongodb.net/test?retryWrites=true&w=majority", { newUrlParser: true })["catch"](function (error) { return console.log(error); });