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
export const PIECE_COLOR_WHITE = 'w';
export const PIECE_COLOR_BLACK = 'b';

export const PIECE_TYPE_TOUK = 'b'; // Boat
export const PIECE_TYPE_SES = 'h'; // Horse
export const PIECE_TYPE_KOL = 'g'; // General
export const PIECE_TYPE_SDECH = 'k'; // King
export const PIECE_TYPE_NEANG = 'q'; // Queen
export const PIECE_TYPE_TREY = 'f'; // Fish
export const PIECE_TYPE_BORK = 't'; // Transform fish
export const EMPTY_PIECE = '.';
export const BOARD_SEPARATOR = '/';

export const pieceHash: { [key: string]: string } = {
    a: PIECE_COLOR_WHITE + PIECE_TYPE_TOUK,
    b: PIECE_COLOR_WHITE + PIECE_TYPE_SES,
    c: PIECE_COLOR_WHITE + PIECE_TYPE_KOL,
    d: PIECE_COLOR_WHITE + PIECE_TYPE_SDECH,
    e: PIECE_COLOR_WHITE + PIECE_TYPE_NEANG,
    f: PIECE_COLOR_WHITE + PIECE_TYPE_TREY,
    g: PIECE_COLOR_WHITE + PIECE_TYPE_BORK,
    h: PIECE_COLOR_BLACK + PIECE_TYPE_TOUK,
    i: PIECE_COLOR_BLACK + PIECE_TYPE_SES,
    j: PIECE_COLOR_BLACK + PIECE_TYPE_KOL,
    k: PIECE_COLOR_BLACK + PIECE_TYPE_SDECH,
    l: PIECE_COLOR_BLACK + PIECE_TYPE_NEANG,
    m: PIECE_COLOR_BLACK + PIECE_TYPE_TREY,
    n: PIECE_COLOR_BLACK + PIECE_TYPE_BORK,
};
