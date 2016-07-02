import {Component, AfterViewInit} from "@angular/core";
import {IPosition, Position} from './position';
import {WalkerService} from './walker.service';
@Component({
    selector: "my-app",
    templateUrl: "views/app.component.html",
    providers: [WalkerService]
})
export class AppComponent implements AfterViewInit {
    context: CanvasRenderingContext2D;
    myCanvas: HTMLCanvasElement;
    canvasWidth: number;
    canvasHeight: number;
    isDrawing: boolean = true;

    constructor(private walkerService: WalkerService) {
    }

    ngAfterViewInit() {
        this.myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        this.context = this.myCanvas.getContext("2d");
        this.canvasHeight = this.myCanvas.height;
        this.canvasWidth = this.myCanvas.width;
        this.reset();
        this.tick();
    }

    tick() {
        if (this.isDrawing) {
            requestAnimationFrame(() => {
                this.tick()
            });
        }
        this.context.fillStyle = this.walkerService.getNewColor().toHex();
        var newPos = this.walkerService.getNewPosition();
        this.context.fillRect(newPos.x*10, newPos.y*10, 10, 10);
    }

    toggleDrawing() {
        this.isDrawing = !this.isDrawing;
        if (this.isDrawing) {
            this.tick();
        }
    }

    reset() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.walkerService.set(this.canvasWidth / 20, this.canvasHeight / 20);
    }
}