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
import { KPGN, Move } from './kpgn/index';
import MoveManager from './board/MoveManager';
import asciiTable from './other/table';
import { Piece, REN } from './ren/index';

export default class KhmerChess {
    static title = config.name;
    static version = config.version;
    moveManager: MoveManager;
    renInstance: REN;
    kpgnInstance = new KPGN();
    constructor(renStr?: string) {
        this.moveManager = new MoveManager();
        this.renInstance = REN.fromString(renStr);
    }

    load(renStr: string) {
        this.renInstance = REN.fromString(renStr);
    }

    reset() {
        this.renInstance = REN.fromString();
    }

    moves(): Move[] {
        // TODO:
        return [];
    }

    inCheck(): string | null {
        // TODO:
        return null;
    }

    inCheckmate(): string | null {
        // TODO:
        return null;
    }

    inStalemate(): string | null {
        // TODO:
        return null;
    }

    inDraw() {
        // TODO:
        return false;
    }

    inDrawCount(): string | null {
        // TODO:
        return null;
    }

    gameOver() {
        // TODO:
        return false;
    }

    validateRen(renStr: string) {
        try {
            REN.fromString(renStr);
            return { valid: true, error_number: 0, error: 'No errors.' };
        } catch (error) {
            return { valid: false, error_number: 1, error: error.message };
        }
    }

    ren() {
        return this.renInstance.toString();
    }

    board() {
        return this.renInstance.board.toMultiArray();
    }

    graveyard() {
        return this.renInstance.graveyard.pieces;
    }

    // Khmer Portable Game Notation <file-name>.kpgn.json
    kpgn() {
        return this.kpgnInstance.toJson();
    }

    loadKpgn(kpgnJosn: any, options: any) {
        this.kpgnInstance = new KPGN();
    }

    ascii() {
        return asciiTable(this.renInstance);
    }

    turn() {
        return this.renInstance.turn;
    }

    move(from: number, to: number): Move | null {
        // TODO:
        return null;
    }

    undo() {
        // TODO:
        return false;
    }

    /**
     * Move all pieces to graveyard except kings
     * -> 4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB
     */
    clear() {
        this.renInstance = REN.fromString('4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB');
    }

    put(index: number, piece: Piece): Piece | null {
        // TODO: move piece to square id location
        return null;
    }

    get(index: number): Piece | null {
        // TODO: get piece at square id location
        return null;
    }

    movePieceToGraveyard(index: number): Piece | null {
        // TODO: move piece to graveyard
        return null;
    }

    history() {
        return this.kpgnInstance.moves;
    }

    addMoveEventListener(listener: (move: Move) => {}) {
        // TODO:
    }

    removeMoveEventListener(listener: (move: Move) => {}) {
        // TODO:
    }
}
