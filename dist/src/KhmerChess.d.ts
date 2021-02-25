import KPGN from './kpgn/KPGN';
import Move from './kpgn/Move';
import BoardEventController, { BoardEvent } from './other/BoardEventController';
import { ListenerType } from './other/EventHandler';
import { PieceIndex } from './ren';
import Point from './ren/Point';
import REN from './ren/REN';
export default class KhmerChess {
    static title: string;
    static version: string;
    renInstance: REN;
    kpgnInstance: KPGN;
    boardEventController: BoardEventController;
    constructor(renStr?: string);
    load(renStr: string): void;
    reset(): void;
    getCanMoves(): Move[];
    getCanMovePointsByPoint(point: Point): Point[];
    getAttacker(): PieceIndex | null;
    getWinColor(): string | null;
    getStuckColor(): string | null;
    isDraw(): string;
    getDrawCountColor(): string | null;
    gameOver(): string;
    validateRen(renStr: string): {
        valid: boolean;
        error_number: number;
        error: any;
    };
    ren(): string;
    get piecesInBoardMultiArray(): import("./ren").Piece[][];
    get piecesInBoard(): import("./ren").Piece[];
    get piecesInGraveyard(): import("./ren").Piece[];
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
            fromIndex: number;
            toIndex: number;
            isJumping: boolean;
            capturedPiece: string;
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
    move(moveFromIndex: number, moveToIndex: number): Move | null;
    undo(): boolean;
    /**
     * Move all pieces to graveyard except kings
     * -> 4k3/8/8/8/8/8/8/3K4 w ---- -- -.- bhgqghbffffffffFFFFFFFFBHGQGHB
     */
    clear(): void;
    history(): Move[];
    checkBoardEvent(): void;
    addBoardEventListener(listener: ListenerType<BoardEvent>): void;
    removeBoardEventListener(listener: ListenerType<BoardEvent>): void;
}
