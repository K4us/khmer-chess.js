export default class Move {
    from: string;
    to: string;
    jump: boolean;
    capture: string;
    constructor(from: string, to: string, jump: boolean, capture: string);
    toJson(): {
        from: string;
        to: string;
        jump: boolean;
        capture: string;
    };
}
