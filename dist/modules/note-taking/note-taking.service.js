"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNoteTaking = createNoteTaking;
var _noteTaking = require("../../models/note-taking.model");
function createNoteTaking(noteTakingData) {
  var newnoteTaking = new _noteTaking.noteTakingModel(noteTakingData);
  return newnoteTaking.save();
}