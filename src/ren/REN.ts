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
import Board from './Board';
import KqMoved from './KqMoved';
import KAttacked from './KAttacked';
import CountDown from './CountDown';
import Graveyard from './Graveyard';
import {
    jsis,
    MoveHelper,
    PIECE_COLOR_WHITE,
} from '../brain/index';
import {
    DEFAULT_BOARD_STR,
    STRING_COUNT,
} from './constant';
import Move from '../kpgn/Move';
import Point from './Point';
import { Captured } from '../kpgn';

/**
 * Raksa-Eng Notation
 * fen: <pieces on board> <turn w|b> <king&queen moved ----|SNsn> <king attack --|Kk> <countdown -.-|-.4> <pieces in graveyard>
 */
export type RENPropType = {
    boardStr: string;
    turnStr: string;
    kqMovedStr: string;
    kAttackedStr: string;
    countdownStr: string;
    graveyardStr: string;
}
export default class REN {
    board: Board;
    turn: string;
    kqMoved: KqMoved;
    kAttacked: KAttacked;
    countdown: CountDown;
    graveyard: Graveyard;
    moveHelper: MoveHelper;
    constructor({ boardStr,
        turnStr,
        kqMovedStr,
        kAttackedStr,
        countdownStr,
        graveyardStr }: RENPropType) {
        this.board = new Board(boardStr);
        this.turn = turnStr;
        this.kqMoved = new KqMoved(kqMovedStr);
        this.kAttacked = new KAttacked(kAttackedStr);
        this.countdown = new CountDown(countdownStr);
        this.graveyard = new Graveyard(graveyardStr);
        const invalidPiecesString = this.isInvalidPieceCount();
        if (invalidPiecesString) {
            let msg = `Invalid piece string board:${boardStr}`;
            msg += `, graveyard:${graveyardStr}, count:${invalidPiecesString}`;
            throw new Error(msg);
        }
        this.moveHelper = new MoveHelper();
    }

    isInvalidPieceCount() {
        const pieces = this.board.pieceIndices.map((pos) => {
            return pos.piece;
        }).filter((p) => {
            return !jsis.isNull(p);
        }).concat(this.graveyard.pieces).map((p) => {
            return p.toOriginPiece();
        });
        const piecesCount = pieces.reduce((obj: any, p) => {
            obj[p.pieceCharCode] = obj[p.pieceCharCode] || 0;
            obj[p.pieceCharCode]++;
            return obj;
        }, {});
        const str = Object.keys(piecesCount).map((k) => `${k}${piecesCount[k]}`).sort().join('');
        if (str === STRING_COUNT) {
            return false;
        }
        return str;
    }

    static fromString(fen?: string) {
        if (jsis.isUndefined(fen)) {
            fen = DEFAULT_BOARD_STR;
        }
        const fenArr = fen.split(' ');
        return new REN({
            boardStr: fenArr[0],
            turnStr: fenArr[1],
            kqMovedStr: fenArr[2],
            kAttackedStr: fenArr[3],
            countdownStr: fenArr[4],
            graveyardStr: fenArr[5],
        });
    }

    move(moveFromIndex: number, moveToIndex: number): Move | null {
        const piece = this.board.getPieceAtIndex(moveFromIndex);
        if (jsis.isNull(piece)) {
            return null;
        }
        this.board.pieceIndices[moveFromIndex].piece = null;
        const move = new Move({
            moveFrom: Point.fromIndex(moveFromIndex),
            moveTo: Point.fromIndex(moveToIndex),
            piece,
        });
        const targetPiece = this.board.getPieceAtIndex(moveToIndex);
        if (targetPiece) {
            this.graveyard.pieces.push(targetPiece);
            move.captured = new Captured({
                fromBoardPoint: Point.fromIndex(moveToIndex),
                toGraveyardPoint: Point.fromIndex(this.graveyard.lastIndex),
                piece: targetPiece,
            });
        }
        this.board.pieceIndices[moveToIndex].piece = piece;
        return move;
    }

    toString() {
        let str = this.board.toString();
        str += ` ${this.turn.toString()}`;
        str += ` ${this.kqMoved.toString()}`;
        str += ` ${this.kAttacked.toString()}`;
        str += ` ${this.countdown.toString()}`;
        str += ` ${this.graveyard.toString()}`;
        return str;
    }

    getCanMovePointsByPoint(pont: Point): Point[] {
        const canMoves = this.moveHelper.calcCanMove({
            piecesString: 'string',
            currentTurn: PIECE_COLOR_WHITE,
            isNeangMoved: true,
            isSdechMoved: true,
            genCanMove: true,
            genCanMoveForAnother: false,
        });
        console.log(canMoves);
        return [];
    }
}
