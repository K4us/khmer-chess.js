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
import { Piece } from '../ren';

export default class Move {
    moveFromIndex: number;
    moveToIndex: number;
    isJumping = false; // King or Queen would jump on first start
    capturedPiece: Piece | null;
    constructor(moveFromIndex: number, moveToIndex: number,
        capturedPiece: Piece | null,
        isJumping?: boolean) {
        this.moveFromIndex = moveFromIndex;
        this.moveToIndex = moveToIndex;
        this.capturedPiece = capturedPiece;
        this.isJumping = !!isJumping;
    }

    // Spec: Fc5d6xf => White fish (F) moved from c5 to d6 killed black fish (f)
    static fromMovedString() {
        // const str = 'Fc5d6j';
        const str = 'Fc5d6xf';
        const piece = Piece.fromCharCode(str[0]);
        const fromIndexCode = str.substr(1, 2);
        const toIndexCode = str.substr(3, 2);
        if (str[5] === 'x') {
            const capturedPieceChar = str[6];
        } else if (str[5] === 'j') {
            const isJumping = true;
        }

        return 'c5d6';
    }

    toString() {
        // TODO: implement this
        // const str = 'Fc5d6j';
        const str = 'Fc5d6xf';
        const pieceChar = str[0];
        const fromIndexCode = str.substr(1, 2);
        const toIndexCode = str.substr(3, 2);
        if (str[5] === 'x') {
            const capturedPieceChar = str[6];
        } else if (str[5] === 'j') {
            const isJumping = true;
        }

        return 'c5d6';
    }

    toJson() {
        return {
            fromIndex: this.moveFromIndex,
            toIndex: this.moveToIndex,
            isJumping: this.isJumping,
            capturedPiece: this.capturedPiece ? this.capturedPiece.pieceCharCode : null,
        };
    }
}
