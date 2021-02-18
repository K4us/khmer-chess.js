export class KPGN {
    event: string;
    date: string;
    location: string;
    players: {
        white: Player;
        black: Player;
    };
    result: {
        last: {
            whiteWin: boolean;
            blackWin: boolean;
        };
        white: Result;
    };
    moves: Move[];
    ren: REN;
    timer: Timer;
    toJson(): {
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
            totalSecond: number;
            currentWhite: number;
            currentBlack: number;
        };
    };
}
export class Player {
    constructor(id?: string, name?: string);
    name: string;
    id: string;
    toJson(): {
        id: string;
        name: string;
    };
}
export class Result {
    constructor(win?: number, draw?: number, lost?: number);
    win: number;
    draw: number;
    lost: number;
    toJson(): {
        win: number;
        draw: number;
        lost: number;
    };
}
/**
 * Move piece to another position
 *
 * @class Move
 */
export class Move {
    /**
     * Creates an instance of Move.
     * @param string [from='']
     * @param string [to='']
     * @param boolean [jump=false] king or queen jump over position
     * @param string [capture='']
     * @memberof Move
     */
    constructor(from?: string, to?: string, jump?: boolean, capture?: string);
    from: string;
    to: string;
    jump: boolean;
    capture: string;
    toJson(): {
        from: string;
        to: string;
        jump: boolean;
        capture: string;
    };
}
export class Timer {
    constructor(totalSecond?: number, currentWhite?: number, currentBlack?: number);
    totalSecond: number;
    currentWhite: number;
    currentBlack: number;
    toJson(): {
        totalSecond: number;
        currentWhite: number;
        currentBlack: number;
    };
}
import { REN } from "./REN";
