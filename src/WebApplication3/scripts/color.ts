export interface IColor {
    r: number;
    g: number;
    b: number;
    a: number;
    toHex(): string;
    toRGBA(): string;
}

export class Color implements IColor {
    r: number;
    g: number;
    b: number;
    a: number;

    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    toHex() { return "#" + this.toHexSingle(this.r) + this.toHexSingle(this.g) + this.toHexSingle(this.b) }

    private toHexSingle(n) {
        n = parseInt(n, 10);
        if (isNaN(n)) return "00";
        n = Math.max(0, Math.min(n, 255));
        return "0123456789ABCDEF".charAt((n - n % 16) / 16)
            + "0123456789ABCDEF".charAt(n % 16);
    }

    toRGBA() {
        return "rgba(" + Math.floor(this.r) + "," + Math.floor(this.g) + "," + Math.floor(this.b) + "," + this.a.toFixed(2) + ")";
    }
}