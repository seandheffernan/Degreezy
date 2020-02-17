"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// Dependencies
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1["default"]();
// Middleware
app.use(body_parser_1["default"].json());
app.use(body_parser_1["default"].urlencoded({ extended: false }));
// Server Start
var port = 3000;
app.get('/', function (req, res) { return res.send("Hello World"); });
app.listen(port, function () { return console.log("Example app listening on port " + port); });
