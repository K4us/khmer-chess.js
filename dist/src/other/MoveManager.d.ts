export default class MoveManager {
    piecesString: any;
    currentTurn: any;
    isNeangMoved: any;
    isSdechMoved: any;
    genCanMove: any;
    genCanMoveForAnother: any;
    whiteMoves: any[];
    blackMoves: any[];
    whiteKingInDanger: any;
    whiteKingWillInDanger: any;
    blackKingInDanger: any;
    blackKingWillInDanger: any;
    winColor: any;
    stuckColor: any;
    init(option: {
        piecesString: any;
        currentTurn: any;
        isNeangMoved: any;
        isSdechMoved: any;
        genCanMove: any;
        genCanMoveForAnother: any;
    }): void;
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
        blackKingInDanger: any;
        whiteKingInDanger: any;
        blackKingWillInDanger: any;
        whiteKingWillInDanger: any;
        winColor: any;
        stuckColor: any;
        blackCountable: boolean;
        whiteCountable: boolean;
    };
    calCount(option: {
        piecesString: any;
        force: any;
    }): {
        countingBlack: any[];
        countingWhite: any[];
    };
}
