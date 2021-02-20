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
    fromIndex: number;
    toIndex: number;
    isJumping = false; // King or Queen would jump on first start
    capturedPiece: Piece | null;
    constructor(fromIndex: number, toIndex: number,
        capturedPiece: Piece | null,
        isJumping?: boolean) {
        this.fromIndex = fromIndex;
        this.toIndex = toIndex;
        this.capturedPiece = capturedPiece;
        this.isJumping = !!isJumping;
    }

    // Spec: Fc5d6xf => White fish (F) moved from c5 to d6 killed black fish (f)
    static fromMovedString() {
        // TODO: translate string
        return new Move(0, 8, null, false);
    }

    toString() {
        // TODO: implement this
        return 'Fc5d6xf';
    }

    toJson() {
        return {
            fromIndex: this.fromIndex,
            toIndex: this.toIndex,
            isJumping: this.isJumping,
            capturedPiece: this.capturedPiece ? this.capturedPiece.toString() : null,
        };
    }
}
