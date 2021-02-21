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
import jsis from './jsis';
import genMask from './genMask';
import {
    PIECE_COLOR_WHITE,
    PIECE_COLOR_BLACK,
    EMPTY_PIECE,
    pieceHash,
    ROW_NUMBER,
    PIECE_TYPE_TREY,
    PIECE_TYPE_TOUK,
    PIECE_TYPE_KOL,
    PIECE_TYPE_SES,
    PIECE_TYPE_SDECH,
    PIECE_TYPE_NEANG,
    PIECE_COLOR_EMPTY,
    CELL_COUNT,
} from './constant';
import Point from '../ren/Point';
import Piece from '../ren/Piece';
import PieceIndex from '../ren/PieceIndex';

const mask = genMask();

class BoardHelper {
    getCharPieceFromString(piecesString: string, index: number) {
        if (Point.isIndexInBoard(index) && piecesString.length === CELL_COUNT) {
            return piecesString.charAt(index);
        }
        return EMPTY_PIECE;
    }
    getPieceProperties(pieceCode: string) {
        const h = pieceHash[pieceCode];
        return new Piece(h ? h[1] : EMPTY_PIECE, h ? h[0] : PIECE_COLOR_EMPTY);
    }
    getCharPieceInPos(index: number, piecesString: string) {
        return this.getCharPieceFromString(piecesString, index);
    }
    getPieceByIndex(index: number, piecesString: string): {
        isValidPiece: boolean, piece: Piece | null
    } {
        const piece = this.getCharPieceInPos(index, piecesString);
        return {
            isValidPiece: Piece.isValidPiece(piece),
            piece: Piece.fromCharCode(piece),
        };
    }
    convertMask = (point1: Point, index: number, color: string) => {
        const sign = Piece.isWhiteColor(color) ? 1 : -1;
        const point2 = Point.fromIndex(index);
        point1.x = point1.x * sign + point2.x;
        point1.y = point1.y * sign + point2.y;
        return point1.index;
    };
    getPieceCanMovePoses(index: number, piece: Piece) {
        const pieceIndices: number[] = [];
        mask[piece.type].forEach((_pos: number[]) => {
            const newIndex = this.convertMask(new Point(_pos[0], _pos[1]), index, piece.color);
            if (!jsis.isNull(newIndex)) {
                pieceIndices.push(newIndex);
            }
        });
        return pieceIndices;
    }
    getPieceCanMovePosesValid(index: number, piece: Piece, piecesString: string) {
        const _poses = this.getPieceCanMovePoses(index, piece);
        const pieceIndices = [];
        const n = _poses.length;
        const thisPos = Point.fromIndex(index);
        for (let i = 0; i < n; i++) {
            let p = Point.fromIndex(_poses[i]);
            const distPiece = this.getPieceByIndex(p.index, piecesString);
            if (distPiece.isValidPiece) {
                if (piece.color === distPiece.piece.color ||
                    (piece.type === PIECE_TYPE_TREY && p.x === thisPos.x)) {
                    p = null;
                }
            } else {
                if (piece.type === PIECE_TYPE_TREY && p.x !== thisPos.x) {
                    p = null;
                }
            }
            if (!jsis.isNull(p) && piece.type === PIECE_TYPE_TOUK) {
                const _x = thisPos.x;
                const _y = thisPos.y;
                let _n, _s;
                if (p.x === thisPos.x) {
                    _n = Math.abs(p.y - thisPos.y);
                    _s = thisPos.y < p.y ? 1 : -1;
                    while (--_n > 0) {
                        if (this.getPieceByIndex(Point.xyToIndex(_x, _y + _s * _n), piecesString).isValidPiece) {
                            p = null;
                            break;
                        }
                    }
                } else if (p.y === thisPos.y) {
                    _n = Math.abs(p.x - thisPos.x);
                    _s = thisPos.x < p.x ? 1 : -1;
                    while (--_n > 0) {
                        if (this.getPieceByIndex(Point.xyToIndex(_x + _s * _n, _y), piecesString).isValidPiece) {
                            p = null;
                            break;
                        }
                    }
                }
            }
            if (!jsis.isNull(p)) {
                pieceIndices.push(_poses[i]);
            }
        }
        return pieceIndices;
    }
    replacePiecesStringAtIndex(piecesString: string, c: string, index: number) {
        return piecesString.substring(0, index) + c + piecesString.substring(index + 1);
    }
    injectPiece(piecesString: string, index1: number, index2: number) {
        const c = piecesString.charAt(index1);
        if (!this.isCharPiecesInBoard(c, piecesString)) {
            return null;
        }
        piecesString = this.replacePiecesStringAtIndex(piecesString, EMPTY_PIECE, index1);
        piecesString = this.replacePiecesStringAtIndex(piecesString, c, index2);
        return piecesString;
    }
    getPieceCode(piece: Piece) {
        const val = piece.color + piece.type;
        for (const k in pieceHash) {
            if (val === pieceHash[k]) {
                return k;
            }
        }
        return EMPTY_PIECE;
    }
    getKingWillInDanger(color: string, piecesString: string) {
        const kingPos = piecesString.indexOf(this.getPieceCode(new Piece(PIECE_TYPE_SDECH, color)));
        const n = piecesString.length;
        let _poses;
        for (let i = 0; i < n; i++) {
            const p = this.getPieceByIndex(i, piecesString);
            if (p.isValidPiece && p.piece.color !== color &&
                p.piece.type === PIECE_TYPE_TOUK) {
                _poses = this.getPieceCanMovePoses(i, p.piece);
                for (let j = 0; j < _poses.length; j++) {
                    if (_poses[j] === kingPos) {
                        return [Point.fromIndex(i), Point.fromIndex(kingPos)];
                    }
                }
            }
        }
        return null;
    }
    getKingInDanger(color: string, piecesString: string): Point[] | null {
        const kingPos = piecesString.indexOf(this.getPieceCode(new Piece(PIECE_TYPE_SDECH, color)));
        const n = piecesString.length;
        let _poses;
        for (let i = 0; i < n; i++) {
            const p = this.getPieceByIndex(i, piecesString);
            if (p.isValidPiece && p.piece.color !== color) {
                _poses = this.getPieceCanMovePosesValid(i, p.piece, piecesString);
                for (let j = 0; j < _poses.length; j++) {
                    if (_poses[j] === kingPos) {
                        return [Point.fromIndex(i), Point.fromIndex(kingPos)];
                    }
                }
            }
        }
        return null;
    }
    generatePosesCanMove(index: number, piece: Piece, piecesString: string, isHaveMoved: boolean) {
        const _poses = this.getPieceCanMovePosesValid(index, piece, piecesString);
        const isHaveCaptured = this.isHaveCaptured(piecesString);
        if (piece.type === PIECE_TYPE_SDECH) {
            if (!isHaveCaptured && !isHaveMoved) {
                let p = this.convertMask(new Point(2, 1), index, piece.color);
                if (p && !this.getPieceByIndex(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
                p = this.convertMask(new Point(-2, 1), index, piece.color);
                if (p && !this.getPieceByIndex(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
            }
        } else if (piece.type === PIECE_TYPE_NEANG) {
            if (!isHaveCaptured && !isHaveMoved) {
                const p = this.convertMask(new Point(-0, 2), index, piece.color);
                if (p && !this.getPieceByIndex(p, piecesString).isValidPiece) {
                    _poses.push(p);
                }
            }
        }
        const n = _poses.length;
        const pieceIndices = [];
        let str;
        for (let i = 0; i < n; i++) {
            str = this.injectPiece(piecesString, index, _poses[i]);
            if (jsis.isNull(this.getKingInDanger(piece.color, str))) {
                pieceIndices.push(Point.fromIndex(_poses[i]));
            }
        }
        return pieceIndices;
    }
    isCharPiecesInBoard(code: string, piecesString: string) {
        return !!~piecesString.indexOf(code);
    }
    getPiecesInBoard(piecesString: string) {
        return piecesString.split('').filter((c: string) => {
            return Piece.isValidPiece(c);
        });
    }
    isHaveCaptured(piecesString: string) {
        return this.getPiecesInBoard(piecesString).length < ROW_NUMBER * 4;
    }
    filterPieceInBoard(piecesString: string) {
        const whitePieces: PieceIndex[] = [];
        const blackPieces: PieceIndex[] = [];
        let c, prop, piece;
        for (let i = 0; i < piecesString.length; i++) {
            c = piecesString.charAt(i);
            if (Piece.isValidPiece(c)) {
                prop = this.getPieceProperties(c);
                const point = Point.fromIndex(i);
                piece = new PieceIndex(point.x, point.y, prop);
                if (Piece.isWhiteColor(piece.color)) {
                    whitePieces.push(piece);
                } else {
                    blackPieces.push(piece);
                }
            }
        }
        return {
            whitePieces,
            blackPieces,
        };
    }
    extractPiecesToArray(piecesString: string) {
        const piecesStringArr = piecesString.split('');
        const pieceAll: { [x: string]: string[] } = {
            [PIECE_COLOR_BLACK]: [],
            [PIECE_COLOR_WHITE]: [],
        };
        piecesStringArr.forEach((c: string) => {
            if (c === EMPTY_PIECE) {
                return;
            }
            const prop = this.getPieceProperties(c);
            pieceAll[prop.color].push(prop.type);
        });
        return pieceAll;
    }
    isStateCount(c: string, piecesString: string) {
        const allPieces = this.extractPiecesToArray(piecesString);
        return allPieces[c].length === 1;
    }
    checkCountable(color: string, piecesString: string) {
        const pieceAll = this.extractPiecesToArray(piecesString);
        const weaker = pieceAll[color];
        const stronger = pieceAll[Piece.oppositeColor(color)];
        return weaker.length <= 2 && stronger.length >= 2;
    }
    checkCount(color: string, piecesString: string, force: boolean) {
        const countChar = (str: string[], c: string) => {
            return str.join('').split(c).length - 1;
        };
        const charExist = (str: string[], c: string) => {
            return !!~str.indexOf(c);
        };

        const pieceAll = this.extractPiecesToArray(piecesString);
        const weaker = pieceAll[color];
        const stronger = pieceAll[Piece.oppositeColor(color)];
        if (weaker.length === 1 && stronger.length > 1) {
            if (!charExist(stronger, PIECE_TYPE_TREY)) {
                let count = 64;
                const toukCount = countChar(stronger, PIECE_TYPE_TOUK);
                if (toukCount) {
                    count = toukCount > 1 ? 8 : 16;
                } else if (countChar(stronger, PIECE_TYPE_KOL) > 1) {
                    count = 22;
                } else if (countChar(stronger, PIECE_TYPE_SES) > 1) {
                    count = 32;
                } else if (countChar(stronger, PIECE_TYPE_KOL)) {
                    count = 44;
                }
                return [stronger.length + 1, count];
            }
            return [0, 64];
        } else if (force && this.checkCountable(color, piecesString)) {
            return [0, 64];
        }
        return null;
    }
};

export default new BoardHelper();
