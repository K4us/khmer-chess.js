import Board from './Board';
import KqMoved from './KqMoved';
import KAttacked from './KAttacked';
import CountDown from './CountDown';
import Graveyard from './Graveyard';
/**
 * Raksa-Eng Notation
 * fen: <pieces on board> <turn w|b> <king&queen moved ----|SNsn> <king attack --|Kk> <countdown -.-|-.4> <pieces in graveyard>
 */
declare type RENPropType = {
    boardStr: string;
    turnStr: string;
    kqMovedStr: string;
    kAttackedStr: string;
    countdownStr: string;
    graveyardStr: string;
};
export default class REN {
    board: Board;
    turn: string;
    kqMoved: KqMoved;
    kAttacked: KAttacked;
    countdown: CountDown;
    graveyard: Graveyard;
    constructor({ boardStr, turnStr, kqMovedStr, kAttackedStr, countdownStr, graveyardStr }: RENPropType);
    isInvalidPieceCount(): string | false;
    static fromString(fen?: string): REN;
    toString(): string;
}
export {};
