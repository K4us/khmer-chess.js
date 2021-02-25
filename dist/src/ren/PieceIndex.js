"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../brain/index");
var PieceIndex = /** @class */ (function () {
    function PieceIndex(point, piece) {
        this.canMovePoints = [];
        this.point = point;
        this.piece = piece;
    }
    PieceIndex.prototype.toCode = function () {
        return index_1.jsis.isNull(this.piece) ? "" + this.piece.pieceCharCode + this.point.indexCode : null;
    };
    PieceIndex.prototype.toPieceCharCode = function () {
        return index_1.jsis.isNull(this.piece) ? index_1.EMPTY_PIECE : this.piece.pieceCharCode;
    };
    return PieceIndex;
}());
exports.default = PieceIndex;
