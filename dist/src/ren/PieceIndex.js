"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../brain/index");
var Point_1 = __importDefault(require("./Point"));
var PieceIndex = /** @class */ (function () {
    function PieceIndex(x, y, piece) {
        this.point = new Point_1.default(x, y);
        this.piece = piece;
    }
    PieceIndex.prototype.toCode = function () {
        return "" + this.piece.pieceCharCode + this.point.indexCode;
    };
    PieceIndex.prototype.toCharCode = function () {
        return index_1.jsis.isNull(this.piece) ? index_1.EMPTY_PIECE : this.piece.pieceCharCode;
    };
    return PieceIndex;
}());
exports.default = PieceIndex;
