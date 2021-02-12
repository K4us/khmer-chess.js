const rh = require("./src/ren-helper")
const boardHelper = require("./src/board-helper");

const fen = rh.toFen()
// console.log(rh.toObject());
// console.log(boardHelper.isValidPiecesString('sn', true));
console.log(fen.toString());