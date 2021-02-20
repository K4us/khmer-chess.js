import Piece from './Piece';
import Pos from './Pos';
/**
 * BHGQKGHB/8/FFFFFFFF/8/8/ffffffff/8/bhgkqghb => bhgqkghb/......../ffffffff/......../......../FFFFFFFF/......../BHGKQGHB
 */
export default class Board {
    poses: Pos[];
    constructor(boardStr: any);
    toMultiArray(): Piece[][];
    compress(str: string): string;
    extract(str: string): string;
    toStringFull(): string;
    toString(): string;
}
