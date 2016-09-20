import {Injectable} from '@angular/core';
import {ICoordinates, Vector2d} from './position';
import {IColor, Color} from './color';
import {RandomService} from './random.service';

@Injectable()
export class WalkerService {
    currentPosition: ICoordinates;

    constructor(private randomService: RandomService) {
    }

    getNewPosition(): ICoordinates {
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
        return new Vector2d(this.currentPosition.x, this.currentPosition.y);
    }

    getNewColor(): IColor {
        var r = this.getRandom(0, 255);
        var g = this.getRandom(0, 255);
        var b = this.getRandom(0, 255);
        var a = this.getRandom(0, 1);
        return new Color(r, g, b, a);
    }

    set(x, y): void {
        this.currentPosition = new Vector2d(x, y);
    }

    private getRandom(min, max) {
        return Math.floor(this.randomService.getRandom() * (max - min)) + min;
    }

}