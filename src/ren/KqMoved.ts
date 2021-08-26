import { PIECE_TYPE_KING, PIECE_TYPE_QUEEN } from '../brain/constant';
import { NOT_SET } from './constant';
import Piece from './Piece';

/**
 * King or Queen has moved, the will effect jumping
 */
export default class KqMoved {
    whiteKing = false;
    whiteQueen = false;
    blackKing = false;
    blackQueen = false;
    constructor(kqMovedStr?: string) {
        if (kqMovedStr) {
            this.whiteKing = !!~kqMovedStr.indexOf(Piece.toWhiteCharCode(PIECE_TYPE_KING));
            this.whiteQueen = !!~kqMovedStr.indexOf(Piece.toWhiteCharCode(PIECE_TYPE_QUEEN));
            this.blackKing = !!~kqMovedStr.indexOf(PIECE_TYPE_KING);
            this.blackQueen = !!~kqMovedStr.indexOf(PIECE_TYPE_QUEEN);
        }
    }

    toString() {
        let str = `${this.whiteKing ? Piece.toWhiteCharCode(PIECE_TYPE_KING) : NOT_SET}`;
        str += `${this.whiteQueen ? Piece.toWhiteCharCode(PIECE_TYPE_QUEEN) : NOT_SET}`;
        str += `${this.blackKing ? PIECE_TYPE_KING : NOT_SET}`;
        str += `${this.blackQueen ? PIECE_TYPE_QUEEN : NOT_SET}`;
        return str;
    }
}
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
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
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