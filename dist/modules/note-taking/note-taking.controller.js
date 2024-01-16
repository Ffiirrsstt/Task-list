"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;
var _express = require("express");
var router = exports.router = (0, _express.Router)();
router.post("/noteTaking", function (req, res) {
  res.send("noteTaking is working.");
});