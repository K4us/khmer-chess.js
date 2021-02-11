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
 *----------------------------------------------------------------------------*/

"use strict";

const boardHelper = require("./board-helper");

function genMask() {
    const mask = {};
    mask[boardHelper.PIECE_TYPE_TOUK] = [
        [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],
        [0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7], [0, -8],
        [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0],
        [-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0], [-8, 0],
    ];
    mask[boardHelper.PIECE_TYPE_SES] = [
        [-1, -2],
        [1, -2],
        [-2, -1],
        [2, -1],
        [-1, 2],
        [1, 2],
        [-2, 1],
        [2, 1],
    ];
    mask[boardHelper.PIECE_TYPE_NEANG] = [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
    ];
    mask[boardHelper.PIECE_TYPE_KOL] = mask[boardHelper.PIECE_TYPE_NEANG].concat([
        [0, 1],
    ]);
    mask[boardHelper.PIECE_TYPE_SDECH] = mask[boardHelper.PIECE_TYPE_KOL].concat([
        [0, -1],
        [1, 0],
        [-1, 0],
    ]);
    mask[boardHelper.PIECE_TYPE_TREY] = [
        [0, 1],
        [-1, 1],
        [1, 1],
    ];
    mask[boardHelper.PIECE_TYPE_BORK] = mask[boardHelper.PIECE_TYPE_NEANG];
    return mask;
}

module.exports = genMask;