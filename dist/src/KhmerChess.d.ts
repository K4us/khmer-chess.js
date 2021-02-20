import { KPGN, Move } from './kpgn/index';
import MoveManager from './other/MoveManager';
import { Piece, REN } from './ren/index';
export default class KhmerChess {
    static title: string;
    static version: string;
    moveManager: MoveManager;
    renInstance: REN;
    kpgnInstance: KPGN;
    constructor(renStr?: string);
    load(renStr: string): void;
    reset(): void;
    moves(): Move[];
    inCheck(): string | null;
    inCheckmate(): string | null;
    inStalemate(): string | null;
    inDraw(): boolean;
    inDrawCount(): string | null;
    gameOver(): boolean;
    validateRen(renStr: string): {
        valid: boolean;
        error_number: number;
        error: any;
    };
    ren(): string;
    board(): Piece[][];
    graveyard(): Piece[];
    kpgn(): {
        event: string;
        date: string;
        location: string;
        players: {
            white: {
                id: string;
                name: string;
            };
            black: {
                id: string;
                name: string;
            };
        };
        result: {
            last: {
                whiteWin: boolean;
                blackWin: boolean;
            };
            white: {
                win: number;
                draw: number;
                lost: number;
            };
        };
        moves: {
            from: string;
            to: string;
            jump: boolean;
            capture: string;
        }[];
        ren: string;
        timer: {
            totalSecond: string;
            currentWhite: string;
            currentBlack: string;
        };
    };
    loadKpgn(kpgnJosn: any, options: any): void;
    ascii(): string;
    turn(): string;
    move(from: number, to: number): Move | null;
    undo(): boolean;
    /**
     * Move all pieces to graveyard except kings
     * -> 4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB
     */
    clear(): void;
    put(index: number, piece: Piece): Piece | null;
    get(index: number): Piece | null;
    movePieceToGraveyard(index: number): Piece | null;
    history(): Move[];
    addMoveEventListener(listener: (move: Move) => {}): void;
    removeMoveEventListener(listener: (move: Move) => {}): void;
}
