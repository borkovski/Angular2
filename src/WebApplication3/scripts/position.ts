export interface ICoordinates {
    x: number;
    y: number;

    clone(): ICoordinates;
    add(vector: ICoordinates): ICoordinates;
    sub(vector: ICoordinates): ICoordinates;
    mult(scalar: number): ICoordinates;
    div(scalar: number): ICoordinates;
    mag();
    normalize(): ICoordinates;
}

export class Vector2d implements ICoordinates {
    x: number;
    y: number;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone(): ICoordinates {
        return new Vector2d(this.x, this.y);
    }

    add(vector: ICoordinates): ICoordinates {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    sub(vector: ICoordinates): ICoordinates {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    mult(scalar: number): ICoordinates {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    div(scalar: number): ICoordinates {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): ICoordinates {
        var m = this.mag();
        if (m != 0) {
            this.div(m);
        }
        return this;
    }   
}