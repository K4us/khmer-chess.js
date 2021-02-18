export = MoveHelper;
declare class MoveHelper {
    init(option: any): void;
    piecesString: any;
    currentTurn: any;
    isNeangMoved: any;
    isSdechMoved: any;
    genCanMove: any;
    genCanMoveForAnother: any;
    whiteMoves: any[];
    blackMoves: any[];
    whiteKingInDanger: string[];
    whiteKingWillInDanger: string[];
    blackKingInDanger: string[];
    blackKingWillInDanger: string[];
    winColor: string;
    stuckColor: string;
    generateCanMoves(): void;
    cleanPieceNoMove(): void;
    checkIfKingInDanger(): void;
    genWinLost(): void;
    getStuck(): void;
    calcCanMove(option: any): {
        moves: any[];
        anotherMoves: any[];
    };
    calcState(option: any): {
        blackKingInDanger: string[];
        whiteKingInDanger: string[];
        blackKingWillInDanger: string[];
        whiteKingWillInDanger: string[];
        winColor: string;
        stuckColor: string;
        blackCountable: boolean;
        whiteCountable: boolean;
    };
    calCount(option: any): {
        countingBlack: number[];
        countingWhite: number[];
    };
}
