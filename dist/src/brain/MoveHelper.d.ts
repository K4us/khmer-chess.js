import { PieceIndex, Point } from '../ren/index';
export declare type OptionsType = {
    piecesString: string;
    currentTurn: string;
    isNeangMoved: boolean;
    isSdechMoved: boolean;
    genCanMove: boolean;
    genCanMoveForAnother: boolean;
};
export declare type CalCountPropsType = {
    piecesString: string;
    force: boolean;
};
export default class MoveHelper implements OptionsType {
    piecesString: string;
    currentTurn: string;
    isNeangMoved: boolean;
    isSdechMoved: boolean;
    genCanMove: boolean;
    genCanMoveForAnother: boolean;
    whiteMoves: PieceIndex[];
    blackMoves: PieceIndex[];
    whiteKingInDanger: Point[] | null;
    whiteKingWillInDanger: Point[] | null;
    blackKingInDanger: Point[] | null;
    blackKingWillInDanger: Point[] | null;
    winColor: string | null;
    stuckColor: string | null;
    init(option: OptionsType): void;
    generateCanMoves(): void;
    cleanPieceNoMove(): void;
    checkIfKingInDanger(): void;
    genWinLost(): void;
    getStuck(): void;
    calcCanMove(option: OptionsType): {
        moves: PieceIndex[];
        anotherMoves: PieceIndex[];
    };
    calcState(option: OptionsType): {
        blackKingInDanger: Point[];
        whiteKingInDanger: Point[];
        blackKingWillInDanger: Point[];
        whiteKingWillInDanger: Point[];
        winColor: string;
        stuckColor: string;
        blackCountable: boolean;
        whiteCountable: boolean;
    };
    calCount(option: CalCountPropsType): {
        countingBlack: number[];
        countingWhite: number[];
    };
}
