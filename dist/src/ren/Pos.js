"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../board/index");
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
        var indexCode = index_1.boardHelper.xyToIndexCode(this.x, this.y);
        return indexCode;
    };
    Pos.prototype.toPString = function () {
        return index_1.jsis.isNull(this.piece) ? index_1.EMPTY_PIECE : this.piece.toString();
    };
    return Pos;
}());
exports.default = Pos;
