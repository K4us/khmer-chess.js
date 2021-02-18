export class KhmerChess {
    static name: any;
    static version: any;
    constructor(renStr: any);
    moveHelper: MoveHelper;
    renInstance: import("./REN").REN;
    kpgnInstance: KPGN;
    load(renStr: any): void;
    reset(): void;
    /**
     * Generate all available moves of current turn
     */
    moves(): any[];
    /**
     * Is King is attacked (អុក), return under attack color
     *
     * return color|null
     */
    inCheck(): any;
    /**
     * Is win, return lost color
     *
     * return color|null
     */
    inCheckmate(): any;
    /**
     * Is stuck (អាប់), return stuck color
     *
     * return color|null
     */
    inStalemate(): any;
    /**
     * Is draw (ស្មើ)
     *
     * return boolean
     */
    inDraw(): boolean;
    /**
     * Is draw by counting over (ស្មើ​ដោយ​ការ​រាប់), return counter color
     *
     * return color|null
     */
    inDrawCount(): any;
    /**
     * Is game over, win|stuck|win-timeout|draw-count-over|win-resign
     */
    gameOver(): boolean;
    validateRen(renStr: any): {
        valid: boolean;
        error_number: number;
        error: any;
    };
    ren(): string;
    board(): any[][];
    graveyard(): any[];
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
                blackWin: boolean; /**
                 * Move piece regarding provided Move object
                 *
                 * @param Move move
                 * @return boolean
                 * @memberof KhmerChess
                 */
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
            totalSecond: number;
            currentWhite: number;
            currentBlack: number;
        };
    };
    loadKpgn(kpgnJosn: any, options: any): void;
    ascii(): string;
    turn(): string;
    /**
     * Move piece regarding provided Move object
     *
     * @param Move move
     * @return boolean
     * @memberof KhmerChess
     */
    move(move?: Move): boolean;
    /**
     * Undo last move
     *
     * return {Piece, Move}|null
     */
    undo(): boolean;
    /**
     * Move all pieces to graveyard except kings
     * -> 4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB
     */
    clear(): void;
    /**
     * Move piece to square id location
     *
     * @param Piece piece
     * @param String squareId
     *
     * return Piece|null
     */
    put(piece: any, squareId: any): any;
    /**
     * Get piece at square id location
     *
     * @param String squareId 'a1'
     *
     * return Piece|null
     */
    get(squareId: any): any;
    /**
     * Move piece to graveyard
     *
     * @param String squareId 'a1'
     *
     * return Piece|null
     */
    remove(squareId: any): any;
    history(): Move[];
    addUpdateRenderEventListener(listener: any): void;
    removeUpdateRenderEventListener(listener: any): void;
}
import MoveHelper = require("./move-helper");
import { KPGN } from "./KPGN";
import { Move } from "./KPGN";
