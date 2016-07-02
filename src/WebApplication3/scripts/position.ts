export interface IPosition {
    x: number;
    y: number;
}

export class Position implements IPosition {
    x: number;
    y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}