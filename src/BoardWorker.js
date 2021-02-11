/*
 * Copyright (c) 2021, K4us
 * Author: Raksa Eng (eng.raksa@gmail.com)
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
 *----------------------------------------------------------------------------*/

"use strict";

const boardHelper = require("./board-helper");

class BoardWorker {
    init(option) {
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
    }

    generateCanMoves() {
        const filter = boardHelper.filterPieceInBoard(this.piecesString);
        this.whiteMoves = filter.whitePieces;
        this.blackMoves = filter.blackPieces;
        const genMoves = (pieces) => {
            for (let i = 0; i < pieces.length; i++) {
                const type = pieces[i].type;
                const isSdech = type === boardHelper.PIECE_TYPE_SDECH;
                const isNeang = type === boardHelper.PIECE_TYPE_NEANG;
                let isHaveMoved = this.isSdechMoved;
                if (!isSdech) {
                    isHaveMoved = isNeang ? this.isNeangMoved : false;
                }
                const canMoveIndexes = boardHelper.generatePosesCanMove(
                    type,
                    pieces[i].index,
                    pieces[i].color,
                    this.piecesString,
                    isHaveMoved,
                );
                pieces[i].canMoveIndexes = canMoveIndexes;
            }
        };
        genMoves(this.whiteMoves);
        genMoves(this.blackMoves);
    }

    cleanPieceNoMove() {
        const cleanMoves = (pieces) => {
            let isTrue = true;
            while (isTrue) {
                isTrue = false;
                for (let i = 0; i < pieces.length; i++) {
                    const piece = pieces[i];
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
    }

    checkIfKingInDanger() {
        this.whiteKingInDanger = boardHelper.getKingInDanger(
            boardHelper.PIECE_COLOR_WHITE,
            this.piecesString,
        );
        this.whiteKingWillInDanger = boardHelper.getKingWillInDanger(
            boardHelper.PIECE_COLOR_WHITE,
            this.piecesString,
        );
        this.blackKingInDanger = boardHelper.getKingInDanger(
            boardHelper.PIECE_COLOR_BLACK,
            this.piecesString,
        );
        this.blackKingWillInDanger = boardHelper.getKingWillInDanger(
            boardHelper.PIECE_COLOR_BLACK,
            this.piecesString,
        );
    }

    genWinLost() {
        if (this.whiteKingInDanger && !this.whiteMoves.length) {
            this.winColor = boardHelper.PIECE_COLOR_BLACK;
        } else if (this.blackKingInDanger && !this.blackMoves.length) {
            this.winColor = boardHelper.PIECE_COLOR_WHITE;
        }
    }

    getStuck() {
        if (this.winColor) {
            return;
        }
        if (boardHelper.isWhite(this.currentTurn) && !this.whiteMoves.length) {
            this.stuckColor = boardHelper.PIECE_COLOR_WHITE;
        } else if (boardHelper.isBlack(this.currentTurn) && !this.blackMoves.length) {
            this.stuckColor = boardHelper.PIECE_COLOR_BLACK;
        }
    }

    calcCanMove(option) {
        this.init(option);
        this.generateCanMoves();
        this.cleanPieceNoMove();
        let moves = [];
        if (this.genCanMove) {
            moves = boardHelper.isWhite(this.currentTurn) ? this.whiteMoves : this.blackMoves;
        }
        let anotherMoves = [];
        if (this.genCanMoveForAnother) {
            anotherMoves = boardHelper.isBlack(this.currentTurn) ? this.whiteMoves : this.blackMoves;
        }
        return {
            moves,
            anotherMoves,
        };
    }
    calcState(option) {
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
            blackCountable: boardHelper.checkCountable(
                boardHelper.PIECE_COLOR_BLACK,
                this.piecesString,
            ),
            whiteCountable: boardHelper.checkCountable(
                boardHelper.PIECE_COLOR_WHITE,
                this.piecesString,
            ),
        };
    }
    calCount(option) {
        return {
            countingBlack: boardHelper.checkCount(
                boardHelper.PIECE_COLOR_BLACK,
                option.piecesString, option.force,
            ),
            countingWhite: boardHelper.checkCount(
                boardHelper.PIECE_COLOR_WHITE,
                option.piecesString, option.force,
            ),
        };
    }
}

module.exports = BoardWorker;