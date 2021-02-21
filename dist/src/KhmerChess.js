"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
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
var package_json_1 = __importDefault(require("../package.json"));
var index_1 = require("./kpgn/index");
var MoveManager_1 = __importDefault(require("./board/MoveManager"));
var table_1 = __importDefault(require("./other/table"));
var index_2 = require("./ren/index");
var KhmerChess = /** @class */ (function () {
    function KhmerChess(renStr) {
        this.kpgnInstance = new index_1.KPGN();
        this.moveManager = new MoveManager_1.default();
        this.renInstance = index_2.renHelper.toRen(renStr);
    }
    KhmerChess.prototype.load = function (renStr) {
        this.renInstance = index_2.renHelper.toRen(renStr);
    };
    KhmerChess.prototype.reset = function () {
        this.renInstance = index_2.renHelper.toRen();
    };
    KhmerChess.prototype.moves = function () {
        // TODO:
        return [];
    };
    KhmerChess.prototype.inCheck = function () {
        // TODO:
        return null;
    };
    KhmerChess.prototype.inCheckmate = function () {
        // TODO:
        return null;
    };
    KhmerChess.prototype.inStalemate = function () {
        // TODO:
        return null;
    };
    KhmerChess.prototype.inDraw = function () {
        // TODO:
        return false;
    };
    KhmerChess.prototype.inDrawCount = function () {
        // TODO:
        return null;
    };
    KhmerChess.prototype.gameOver = function () {
        // TODO:
        return false;
    };
    KhmerChess.prototype.validateRen = function (renStr) {
        try {
            index_2.renHelper.toRen(renStr);
            return { valid: true, error_number: 0, error: 'No errors.' };
        }
        catch (error) {
            return { valid: false, error_number: 1, error: error.message };
        }
    };
    KhmerChess.prototype.ren = function () {
        return this.renInstance.toString();
    };
    KhmerChess.prototype.board = function () {
        return this.renInstance.board.toMultiArray();
    };
    KhmerChess.prototype.graveyard = function () {
        return this.renInstance.graveyard.pieces;
    };
    // Khmer Portable Game Notation <file-name>.kpgn.json
    KhmerChess.prototype.kpgn = function () {
        return this.kpgnInstance.toJson();
    };
    KhmerChess.prototype.loadKpgn = function (kpgnJosn, options) {
        this.kpgnInstance = new index_1.KPGN();
    };
    KhmerChess.prototype.ascii = function () {
        return table_1.default(this.renInstance);
    };
    KhmerChess.prototype.turn = function () {
        return this.renInstance.turn;
    };
    KhmerChess.prototype.move = function (from, to) {
        // TODO:
        return null;
    };
    KhmerChess.prototype.undo = function () {
        // TODO:
        return false;
    };
    /**
     * Move all pieces to graveyard except kings
     * -> 4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB
     */
    KhmerChess.prototype.clear = function () {
        this.renInstance = index_2.renHelper.toRen('4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB');
    };
    KhmerChess.prototype.put = function (index, piece) {
        // TODO: move piece to square id location
        return null;
    };
    KhmerChess.prototype.get = function (index) {
        // TODO: get piece at square id location
        return null;
    };
    KhmerChess.prototype.movePieceToGraveyard = function (index) {
        // TODO: move piece to graveyard
        return null;
    };
    KhmerChess.prototype.history = function () {
        return this.kpgnInstance.moves;
    };
    KhmerChess.prototype.addMoveEventListener = function (listener) {
        // TODO:
    };
    KhmerChess.prototype.removeMoveEventListener = function (listener) {
        // TODO:
    };
    KhmerChess.title = package_json_1.default.name;
    KhmerChess.version = package_json_1.default.version;
    return KhmerChess;
}());
exports.default = KhmerChess;
