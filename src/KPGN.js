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

const { REN } = require("./REN");

class Player {
    name = '';
    id = '';
    constructor(id = '', name = '') {
        this.id = id;
        this.name = name;
    }
    toJson() {
        return {
            id: this.id,
            name: this.name
        };
    }
}
class Result {
    win = 0;
    draw = 0;
    lost = 0;
    constructor(win = 0, draw = 0, lost = 0) {
        this.win = win;
        this.draw = draw;
        this.lost = lost;
    }
    toJson() {
        return {
            win: this.win,
            draw: this.draw,
            lost: this.lost
        };
    }
}
class Move {
    from = '';
    to = '';
    jump = false;
    capture = ''
    constructor(from = '', to = '', jump = false, capture = '') {
        this.from = from;
        this.to = to;
        this.jump = jump;
        this.capture = capture;
    }
    toJson() {
        return {
            from: this.from,
            to: this.to,
            jump: this.jump,
            capture: this.capture
        };
    }
}
class Timer {
    totalSecond = 0;
    currentWhite = 0;
    currentBlack = 0;
    constructor(totalSecond = 0, currentWhite = 0, currentBlack = 0) {
        this.totalSecond = totalSecond;
        this.currentWhite = currentWhite;
        this.currentBlack = currentBlack;
    }
    toJson() {
        return {
            totalSecond: this.totalSecond,
            currentWhite: this.currentWhite,
            currentBlack: this.currentBlack
        };
    }
}

class KPGN {
    event = '';
    date = '';
    location = '';
    players = {
        white: new Player(),
        black: new Player(),
    }
    result = {
        last: {
            whiteWin: false,
            blackWin: false
        },
        white: new Result()
    };
    moves = [new Move()];
    ren = new REN();
    timer = new Timer();
    constructor(kpgnJson) {
    }
    toJson() {
        return {
            event: this.event,
            date: this.date,
            location: this.location,
            players: {
                white: this.players.white.toJson(),
                black: this.players.black.toJson(),
            },
            result: {
                last: {
                    whiteWin: this.result.last.whiteWin,
                    blackWin: this.result.last.blackWin
                },
                white: this.result.white.toJson()
            },
            moves: this.moves.map((m) => m.toJson()),
            ren: this.ren.toString(),
            timer: this.timer.toJson()
        }
    }
}

module.exports = {
    KPGN,
    Player,
    Result,
    Move,
    Timer
};
