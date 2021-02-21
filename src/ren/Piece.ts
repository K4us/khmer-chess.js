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
import {
    PIECE_COLOR_BLACK,
    PIECE_COLOR_WHITE,
    PIECE_TYPE_BORK,
    PIECE_TYPE_TREY,
    jsis,
    PIECE_TYPE_TOUK,
    PIECE_TYPE_SES,
    PIECE_TYPE_KOL,
    PIECE_TYPE_SDECH,
    PIECE_TYPE_NEANG,
    EMPTY_PIECE,
} from '../board/index';

export default class Piece {
    type: string;
    color: string;
    get pieceCharCode() {
        if (Piece.isWhiteColor(this.color)) {
            return Piece.toWhiteCharCode(this.type);
        }
        return this.type;
    }

    constructor(type: string, color: string) {
        this.type = Piece.toNormalCharCode(type);
        this.color = color;
    }

    static fromCharCode(charCode: string) {
        if (!Piece.isValidPiece(charCode)) {
            return null;
        }
        const color = Piece.isWhiteCharCode(charCode) ? PIECE_COLOR_WHITE : PIECE_COLOR_BLACK;
        const type = Piece.toNormalCharCode(charCode);
        return new Piece(type, color);
    }

    toOriginPiece() {
        if (this.type === PIECE_TYPE_BORK) {
            return new Piece(PIECE_TYPE_TREY, this.color);
        }
        return this;
    }

    static getPieceCharArray() {
        return [
            PIECE_TYPE_TOUK,
            PIECE_TYPE_SES,
            PIECE_TYPE_KOL,
            PIECE_TYPE_SDECH,
            PIECE_TYPE_NEANG,
            PIECE_TYPE_TREY,
            PIECE_TYPE_BORK,
        ];
    }
    static getColorArray() {
        return [
            PIECE_COLOR_WHITE,
            PIECE_COLOR_BLACK,
        ];
    }


    static toWhiteCharCode(charCode: string) {
        return charCode.toUpperCase();
    }
    static isWhiteCharCode(charCode: string) {
        return jsis.isUpperCase(charCode);
    }
    static toBlackCharCode(charCode: string) {
        return charCode.toLowerCase();
    }
    static toNormalCharCode(charCode: string) {
        return Piece.toBlackCharCode(charCode);
    }

    static isValidPiece(piece: string) {
        return piece !== EMPTY_PIECE;
    }
    static isWhiteColor(c: string) {
        return c === PIECE_COLOR_WHITE;
    }
    static isBlackColor(c: string) {
        return c === PIECE_COLOR_BLACK;
    }
    static oppositeColor(color: any) {
        return Piece.isWhiteColor(color) ? PIECE_COLOR_BLACK : PIECE_COLOR_WHITE;
    }
}
