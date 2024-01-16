"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _noteTaking = _interopRequireDefault(require("./modules/note-taking/note-taking.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();

// app.use(bodyParser.json())

app.use(_noteTaking["default"]);
app.listen(8080, function (err) {
  if (err) console.log(err);
  console.log("เริ่มโปรแกรม");
});