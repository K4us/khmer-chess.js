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
import config from '../package.json';
import { jsis } from './brain';
import KPGN from './kpgn/KPGN';
import Move from './kpgn/Move';
import BoardEventController, { BoardEvent } from './other/BoardEventController';
import { ListenerType } from './other/EventHandler';
import asciiTable from './other/table';
import { PieceIndex } from './ren';
import { EVENT_FLAG_ATTACK, EVENT_FLAG_WINN as EVENT_FLAG_WIN } from './ren/constant';
import Point from './ren/Point';
import REN from './ren/REN';

export default class KhmerChess {
    static title = config.name;
    static version = config.version;
    renInstance: REN;
    kpgnInstance: KPGN;
    boardEventController: BoardEventController;
    constructor(renStr?: string) {
        this.renInstance = REN.fromString(renStr);
        this.kpgnInstance = new KPGN(this.renInstance);
        this.boardEventController = new BoardEventController();
    }

    loadRENStr(renStr: string) {
        this.renInstance = REN.fromString(renStr);
    }

    resetBoard() {
        this.renInstance = REN.fromString();
    }

    getCanMoves(): PieceIndex[] {
        const pieceIndices = this.renInstance.genAllCanMoves();
        return pieceIndices;
    }
    getCanMovePointsByPoint(point: Point): Point[] {
        const canMovePoints = this.renInstance.getCanMovePointsByPoint(point);
        return canMovePoints;
    }

    getAttacker(): PieceIndex | null {
        return this.renInstance.getAttacker();
    }

    getWinColor(): string | null {
        return this.renInstance.getWinColor();
    }

    getStuckColor(): string | null {
        // TODO:
        return null;
    }

    isDraw() {
        return this.getStuckColor() || this.getDrawCountColor();
    }

    getDrawCountColor(): string | null {
        // TODO:
        return null;
    }

    gameOver() {
        return this.getWinColor() || this.isDraw();
    }

    validateRENStr(renStr: string) {
        try {
            REN.fromString(renStr);
            return { valid: true, error_number: 0, error: 'No errors.' };
        } catch (error) {
            return { valid: false, error_number: 1, error: error.message };
        }
    }

    getRENStr() {
        return this.renInstance.toString();
    }

    get piecesInBoardMultiArray() {
        return this.renInstance.board.piecesMultiArray;
    }

    get piecesInBoard() {
        return this.renInstance.board.pieces;
    }

    get piecesInGraveyard() {
        return this.renInstance.graveyard.pieces;
    }

    // Khmer Portable Game Notation <file-name>.kpgn.json
    getKPGN() {
        return this.kpgnInstance.toJson();
    }

    loadKpgn(kpgnJosn: any, options: any) {
        this.kpgnInstance = new KPGN(this.renInstance);
    }

    drawAscii() {
        return asciiTable(this.renInstance);
    }

    get turn() {
        return this.renInstance.turn;
    }

    set turn(turn: string) {
        this.renInstance.turn = turn;
    }

    move(moveFromIndex: number, moveToIndex: number): Move | null {
        const move = this.renInstance.move(moveFromIndex, moveToIndex);
        this.kpgnInstance.moves.push(move);
        return move;
    }

    undoMove() {
        // TODO:
        return false;
    }

    /**
     * Move all pieces to graveyard except kings
     * -> 4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB
     */
    clearBoard() {
        this.renInstance = REN.fromString('4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB');
    }

    getHistories() {
        return this.kpgnInstance.moves;
    }

    checkBoardEvent() {
        const pieceIndex = this.getAttacker();
        if (!jsis.isNull(pieceIndex)) {
            const boardEvent = new BoardEvent({
                flag: EVENT_FLAG_ATTACK,
                actorPieceIndex: pieceIndex,
            });
            this.boardEventController.fireEvent(boardEvent);
        }
        const winColor = this.getWinColor();
        if (!jsis.isNull(winColor)) {
            const boardEvent = new BoardEvent({
                flag: EVENT_FLAG_WIN,
                actorPieceIndex: pieceIndex,
            });
            this.boardEventController.fireEvent(boardEvent);
        }
    }
    addBoardEventListener(listener: ListenerType<BoardEvent>) {
        this.boardEventController.addBoardEventListener(listener);
    }
    removeBoardEventListener(listener: ListenerType<BoardEvent>) {
        this.boardEventController.removeBoardEventListener(listener);
    }
}
