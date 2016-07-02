export interface IColor {
    r: number;
    g: number;
    b: number;
    toHex(): string;
}

export class Color implements IColor {
    r: number;
    g: number;
    b: number;

    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    toHex() { return "#" + this.toHexSingle(this.r) + this.toHexSingle(this.g) + this.toHexSingle(this.b) }

    private toHexSingle(n) {
        n = parseInt(n, 10);
        if (isNaN(n)) return "00";
        n = Math.max(0, Math.min(n, 255));
        return "0123456789ABCDEF".charAt((n - n % 16) / 16)
            + "0123456789ABCDEF".charAt(n % 16);
    }
}