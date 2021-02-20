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
import { NOT_SET } from './constant';
import boardHelper from '../board/boardHelper';

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
            const bh = boardHelper;
            this.whiteKing = !!~kqMovedStr.indexOf(bh.toWhitePiece(bh.PIECE_TYPE_SDECH));
            this.whiteQueen = !!~kqMovedStr.indexOf(bh.toWhitePiece(bh.PIECE_TYPE_NEANG));
            this.blackKing = !!~kqMovedStr.indexOf(bh.PIECE_TYPE_SDECH);
            this.blackQueen = !!~kqMovedStr.indexOf(bh.PIECE_TYPE_NEANG);
        }
    }

    toString() {
        let str = `${this.whiteKing ? boardHelper.toWhitePiece(boardHelper.PIECE_TYPE_SDECH) : NOT_SET}`;
        str += `${this.whiteQueen ? boardHelper.toWhitePiece(boardHelper.PIECE_TYPE_NEANG) : NOT_SET}`;
        str += `${this.blackKing ? boardHelper.PIECE_TYPE_SDECH : NOT_SET}`;
        str += `${this.blackQueen ? boardHelper.PIECE_TYPE_NEANG : NOT_SET}`;
        return str;
    }
}
