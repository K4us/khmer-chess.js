"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2021, K4us
 * Author: Raksa Eng <eng.raksa@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *---------------------------------------------------------------------------- */
var index_1 = require("./index");
var index_2 = require("../ren/index");
var MoveHelper = /** @class */ (function () {
    function MoveHelper() {
    }
    MoveHelper.prototype.init = function (option) {
        this.piecesString = option.piecesString;
        this.currentTurn = option.currentTurn;
        this.isNeangMoved = option.isNeangMoved;
        this.isSdechMoved = option.isSdechMoved;
        this.genCanMove = option.genCanMove;
        this.genCanMoveForAnother = option.genCanMoveForAnother;
        this.whiteMoves = [];
        this.blackMoves = [];
        this.whiteKingInDanger = null;
        this.whiteKingWillInDanger = null;
        this.blackKingInDanger = null;
        this.blackKingWillInDanger = null;
        this.winColor = null;
        this.stuckColor = null;
    };
    MoveHelper.prototype.generateCanMoves = function () {
        var _this = this;
        var filter = index_1.boardHelper.filterPieceInBoard(this.piecesString);
        this.whiteMoves = filter.whitePieces;
        this.blackMoves = filter.blackPieces;
        var genMoves = function (pieces) {
            for (var i = 0; i < pieces.length; i++) {
                var piece = pieces[i];
                var type = piece.type;
                var isSdech = type === index_1.PIECE_TYPE_SDECH;
                var isNeang = type === index_1.PIECE_TYPE_NEANG;
                var isHaveMoved = _this.isSdechMoved;
                if (!isSdech) {
                    isHaveMoved = isNeang ? _this.isNeangMoved : false;
                }
                var canMoveIndexes = index_1.boardHelper.generatePosesCanMove(piece.index, piece, _this.piecesString, isHaveMoved);
                piece.canMoveIndexes = canMoveIndexes;
            }
        };
        genMoves(this.whiteMoves);
        genMoves(this.blackMoves);
    };
    MoveHelper.prototype.cleanPieceNoMove = function () {
        var cleanMoves = function (pieces) {
            var isTrue = true;
            while (isTrue) {
                isTrue = false;
                for (var i = 0; i < pieces.length; i++) {
                    var piece = pieces[i];
                    if (!piece.canMoveIndexes || !piece.canMoveIndexes.length) {
                        pieces.splice(i, 1);
                        isTrue = true;
                        break;
                    }
                }
            }
        };
        cleanMoves(this.whiteMoves);
        cleanMoves(this.blackMoves);
    };
    MoveHelper.prototype.checkIfKingInDanger = function () {
        this.whiteKingInDanger = index_1.boardHelper.getKingInDanger(index_1.PIECE_COLOR_WHITE, this.piecesString);
        this.whiteKingWillInDanger = index_1.boardHelper.getKingWillInDanger(index_1.PIECE_COLOR_WHITE, this.piecesString);
        this.blackKingInDanger = index_1.boardHelper.getKingInDanger(index_1.PIECE_COLOR_BLACK, this.piecesString);
        this.blackKingWillInDanger = index_1.boardHelper.getKingWillInDanger(index_1.PIECE_COLOR_BLACK, this.piecesString);
    };
    MoveHelper.prototype.genWinLost = function () {
        if (this.whiteKingInDanger && !this.whiteMoves.length) {
            this.winColor = index_1.PIECE_COLOR_BLACK;
        }
        else if (this.blackKingInDanger && !this.blackMoves.length) {
            this.winColor = index_1.PIECE_COLOR_WHITE;
        }
    };
    MoveHelper.prototype.getStuck = function () {
        if (this.winColor) {
            return;
        }
        if (index_2.Piece.isWhiteColor(this.currentTurn) && !this.whiteMoves.length) {
            this.stuckColor = index_1.PIECE_COLOR_WHITE;
        }
        else if (index_2.Piece.isBlackColor(this.currentTurn) && !this.blackMoves.length) {
            this.stuckColor = index_1.PIECE_COLOR_BLACK;
        }
    };
    MoveHelper.prototype.calcCanMove = function (option) {
        this.init(option);
        this.generateCanMoves();
        this.cleanPieceNoMove();
        var moves = [];
        if (this.genCanMove) {
            moves = index_2.Piece.isWhiteColor(this.currentTurn) ? this.whiteMoves : this.blackMoves;
        }
        var anotherMoves = [];
        if (this.genCanMoveForAnother) {
            anotherMoves = index_2.Piece.isBlackColor(this.currentTurn) ? this.whiteMoves : this.blackMoves;
        }
        return {
            moves: moves,
            anotherMoves: anotherMoves,
        };
    };
    MoveHelper.prototype.calcState = function (option) {
        this.init(option);
        this.generateCanMoves();
        this.cleanPieceNoMove();
        this.checkIfKingInDanger();
        this.genWinLost();
        this.getStuck();
        return {
            blackKingInDanger: this.blackKingInDanger,
            whiteKingInDanger: this.whiteKingInDanger,
            blackKingWillInDanger: this.blackKingWillInDanger,
            whiteKingWillInDanger: this.whiteKingWillInDanger,
            winColor: this.winColor,
            stuckColor: this.stuckColor,
            blackCountable: index_1.boardHelper.checkCountable(index_1.PIECE_COLOR_BLACK, this.piecesString),
            whiteCountable: index_1.boardHelper.checkCountable(index_1.PIECE_COLOR_WHITE, this.piecesString),
        };
    };
    MoveHelper.prototype.calCount = function (option) {
        return {
            countingBlack: index_1.boardHelper.checkCount(index_1.PIECE_COLOR_BLACK, option.piecesString, option.force),
            countingWhite: index_1.boardHelper.checkCount(index_1.PIECE_COLOR_WHITE, option.piecesString, option.force),
        };
    };
    return MoveHelper;
}());
exports.default = new MoveHelper();
