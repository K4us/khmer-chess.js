"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var boardHelper_1 = __importDefault(require("../board/boardHelper"));
var jsis_1 = __importDefault(require("../board/jsis"));
var Pos = /** @class */ (function () {
    function Pos(x, y, piece) {
        this.x = 0;
        this.y = 0;
        this.piece = null;
        this.x = x;
        this.y = y;
        this.piece = piece;
    }
    Pos.prototype.toString = function () {
        var indexCode = boardHelper_1.default.xyToIndexCode(this.x, this.y);
        return indexCode;
    };
    Pos.prototype.toPString = function () {
        return jsis_1.default.isNull(this.piece) ? boardHelper_1.default.EMPTY_PIECE : this.piece.toString();
    };
    return Pos;
}());
exports.default = Pos;
