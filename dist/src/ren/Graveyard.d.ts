import Piece from './Piece';
export default class Graveyard {
    pieces: Piece[];
    constructor(graveyardStr?: string);
    toString(): string;
}
