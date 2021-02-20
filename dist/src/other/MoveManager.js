"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
var boardHelper_1 = __importDefault(require("../board/boardHelper"));
var MoveManager = /** @class */ (function () {
    function MoveManager() {
    }
    MoveManager.prototype.init = function (option) {
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
    MoveManager.prototype.generateCanMoves = function () {
        var _this = this;
        var filter = boardHelper_1.default.filterPieceInBoard(this.piecesString);
        this.whiteMoves = filter.whitePieces;
        this.blackMoves = filter.blackPieces;
        var genMoves = function (pieces) {
            for (var i = 0; i < pieces.length; i++) {
                var type = pieces[i].type;
                var isSdech = type === boardHelper_1.default.PIECE_TYPE_SDECH;
                var isNeang = type === boardHelper_1.default.PIECE_TYPE_NEANG;
                var isHaveMoved = _this.isSdechMoved;
                if (!isSdech) {
                    isHaveMoved = isNeang ? _this.isNeangMoved : false;
                }
                var canMoveIndexes = boardHelper_1.default.generatePosesCanMove(type, pieces[i].index, pieces[i].color, _this.piecesString, isHaveMoved);
                pieces[i].canMoveIndexes = canMoveIndexes;
            }
        };
        genMoves(this.whiteMoves);
        genMoves(this.blackMoves);
    };
    MoveManager.prototype.cleanPieceNoMove = function () {
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
    MoveManager.prototype.checkIfKingInDanger = function () {
        this.whiteKingInDanger = boardHelper_1.default.getKingInDanger(boardHelper_1.default.PIECE_COLOR_WHITE, this.piecesString);
        this.whiteKingWillInDanger = boardHelper_1.default.getKingWillInDanger(boardHelper_1.default.PIECE_COLOR_WHITE, this.piecesString);
        this.blackKingInDanger = boardHelper_1.default.getKingInDanger(boardHelper_1.default.PIECE_COLOR_BLACK, this.piecesString);
        this.blackKingWillInDanger = boardHelper_1.default.getKingWillInDanger(boardHelper_1.default.PIECE_COLOR_BLACK, this.piecesString);
    };
    MoveManager.prototype.genWinLost = function () {
        if (this.whiteKingInDanger && !this.whiteMoves.length) {
            this.winColor = boardHelper_1.default.PIECE_COLOR_BLACK;
        }
        else if (this.blackKingInDanger && !this.blackMoves.length) {
            this.winColor = boardHelper_1.default.PIECE_COLOR_WHITE;
        }
    };
    MoveManager.prototype.getStuck = function () {
        if (this.winColor) {
            return;
        }
        if (boardHelper_1.default.isWhite(this.currentTurn) && !this.whiteMoves.length) {
            this.stuckColor = boardHelper_1.default.PIECE_COLOR_WHITE;
        }
        else if (boardHelper_1.default.isBlack(this.currentTurn) && !this.blackMoves.length) {
            this.stuckColor = boardHelper_1.default.PIECE_COLOR_BLACK;
        }
    };
    MoveManager.prototype.calcCanMove = function (option) {
        this.init(option);
        this.generateCanMoves();
        this.cleanPieceNoMove();
        var moves = [];
        if (this.genCanMove) {
            moves = boardHelper_1.default.isWhite(this.currentTurn) ? this.whiteMoves : this.blackMoves;
        }
        var anotherMoves = [];
        if (this.genCanMoveForAnother) {
            anotherMoves = boardHelper_1.default.isBlack(this.currentTurn) ? this.whiteMoves : this.blackMoves;
        }
        return {
            moves: moves,
            anotherMoves: anotherMoves,
        };
    };
    MoveManager.prototype.calcState = function (option) {
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
            blackCountable: boardHelper_1.default.checkCountable(boardHelper_1.default.PIECE_COLOR_BLACK, this.piecesString),
            whiteCountable: boardHelper_1.default.checkCountable(boardHelper_1.default.PIECE_COLOR_WHITE, this.piecesString),
        };
    };
    MoveManager.prototype.calCount = function (option) {
        return {
            countingBlack: boardHelper_1.default.checkCount(boardHelper_1.default.PIECE_COLOR_BLACK, option.piecesString, option.force),
            countingWhite: boardHelper_1.default.checkCount(boardHelper_1.default.PIECE_COLOR_WHITE, option.piecesString, option.force),
        };
    };
    return MoveManager;
}());
exports.default = MoveManager;
