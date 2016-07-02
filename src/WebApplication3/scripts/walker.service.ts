import {Injectable} from '@angular/core';
import {IPosition, Position} from './position';
import {IColor, Color} from './color';

@Injectable()
export class WalkerService {
    currentPosition: IPosition;

    getNewPosition(): IPosition {
        var rnd = this.getRandom(0, 4);
        switch (rnd) {
            case 0:
                this.currentPosition.x--;
                break;
            case 1:
                this.currentPosition.x++;
                break;
            case 2:
                this.currentPosition.y--;
                break;
            case 3:
                this.currentPosition.y++;
                break;
            default:
                throw Error("Incorrect random value");
        }
        return new Position(this.currentPosition.x, this.currentPosition.y);
    }

    getNewColor(): IColor {
        var r = this.getRandom(0, 255);
        var g = this.getRandom(0, 255);
        var b = this.getRandom(0, 255);
        return new Color(r, g, b);
    }

    set(x, y): void {
        this.currentPosition = new Position(x, y);
    }

    private getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}