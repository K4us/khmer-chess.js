"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var Board_1 = require("./Board");
Object.defineProperty(exports, "Board", { enumerable: true, get: function () { return Board_1.default; } });
var CountDown_1 = require("./CountDown");
Object.defineProperty(exports, "CountDown", { enumerable: true, get: function () { return CountDown_1.default; } });
var Graveyard_1 = require("./Graveyard");
Object.defineProperty(exports, "Graveyard", { enumerable: true, get: function () { return Graveyard_1.default; } });
var KAttacked_1 = require("./KAttacked");
Object.defineProperty(exports, "KAttacked", { enumerable: true, get: function () { return KAttacked_1.default; } });
var KqMoved_1 = require("./KqMoved");
Object.defineProperty(exports, "KqMoved", { enumerable: true, get: function () { return KqMoved_1.default; } });
var Piece_1 = require("./Piece");
Object.defineProperty(exports, "Piece", { enumerable: true, get: function () { return Piece_1.default; } });
var Pos_1 = require("./Pos");
Object.defineProperty(exports, "Pos", { enumerable: true, get: function () { return Pos_1.default; } });
var REN_1 = require("./REN");
Object.defineProperty(exports, "REN", { enumerable: true, get: function () { return REN_1.default; } });
var renHelper_1 = require("./renHelper");
Object.defineProperty(exports, "renHelper", { enumerable: true, get: function () { return renHelper_1.default; } });
__exportStar(require("./constant"), exports);
