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
import boardHelper from '../board/boardHelper';
import jsis from '../board/jsis';

export default class Piece {
    type: string;
    color: string;
    get pCode() {
        if (this.color === boardHelper.PIECE_COLOR_WHITE) {
            return boardHelper.toWhitePiece(this.type);
        }
        return this.type;
    }

    constructor(type: string, color?: string) {
        if (jsis.isUndefined(color)) {
            if (jsis.isUndefined(type)) {
                type = boardHelper.toWhitePiece(boardHelper.PIECE_TYPE_TREY);
            }
            if (jsis.isUpperCase(type)) {
                color = boardHelper.PIECE_COLOR_WHITE;
            } else {
                color = boardHelper.PIECE_COLOR_BLACK;
            }
        }
        type = boardHelper.toBlackPiece(type);
        this.type = type;
        this.color = color;
    }

    toOrigin() {
        if (this.type === boardHelper.PIECE_TYPE_BORK) {
            return new Piece(boardHelper.PIECE_TYPE_TREY, this.color);
        }
        return this;
    }

    toString() {
        let c = this.type;
        if (boardHelper.isWhite(this.color)) {
            c = boardHelper.toWhitePiece(c);
        }
        return c;
    }
}
