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
/* eslint-disable no-unused-vars */
//  Expect import success
// brain
import {
    HVPont,
    Rectangle,
    boardEventController,
    boardHelper,
    genMask,
    jsis,
    MoveHelper,
    OptionsType,
    CalCountPropsType,
    PIECE_COLOR_WHITE,
    PIECE_COLOR_BLACK,
    PIECE_TYPE_TOUK,
    PIECE_TYPE_SES,
    PIECE_TYPE_KOL,
    PIECE_TYPE_SDECH,
    PIECE_TYPE_NEANG,
    PIECE_TYPE_TREY,
    PIECE_TYPE_BORK,
    EMPTY_PIECE,
    PIECE_COLOR_EMPTY,
    BOARD_SEPARATOR,
    ROW_NUMBER,
    ROW_FIRST_INDEX,
    ROW_LAST_INDEX,
    CELL_COUNT,
    HORIZONTAL_CODE_LETTERS,
    HORIZONTAL_NOTE_LETTERS,
    VERTICAL_NOTE_LETTERS,
    HORIZONTAL_NOTE_LETTERS_ASCII,
    VERTICAL_NOTE_LETTERS_ASCII,
} from './brain';
// kpgn
import {
    Captured,
    CapturedPropType,
    KPGN,
    Move,
    MovePropType,
    Player,
    Result,
    Timer,
} from './index';
// other
import {
    EventHandler,
    ListenerType,
    BoardEventController,
    BoardEvent,
    table,
} from './index';
// ren
import {
    Board,
    CountDown,
    Graveyard,
    KAttacked,
    KqMoved,
    Piece,
    PieceIndex,
    Point,
    REN,
    RENPropType,
    STRING_COUNT,
    DEFAULT_BOARD_STR,
    NOT_SET,
    PIECE_FLAG_KILL,
    PIECE_FLAG_JUMP,
} from './index';
//  index
import {
    KhmerChess,
} from './index';


test('KhmerChess should work', () => {
    expect(KhmerChess.title).toBe('khmer-chess');
});
