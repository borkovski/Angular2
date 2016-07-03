import {Component, AfterViewInit} from "@angular/core";
import {IPosition, Position} from './position';
import {IColor, Color} from './color';
import {WalkerService} from './walker.service';
import {RandomService} from './random.service';

@Component({
    selector: "my-app",
    templateUrl: "views/app.component.html",
    providers: [WalkerService, RandomService]
})
export class AppComponent implements AfterViewInit {
    context: CanvasRenderingContext2D;
    myCanvas: HTMLCanvasElement;
    canvasWidth: number;
    canvasHeight: number;
    isDrawing: boolean = true;
    xGaussian;
    yGaussian;

    constructor(private walkerService: WalkerService, private randomService: RandomService) {
    }

    ngAfterViewInit() {
        this.myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        this.context = this.myCanvas.getContext("2d");
        this.canvasHeight = this.myCanvas.height;
        this.canvasWidth = this.myCanvas.width;
        this.xGaussian = this.randomService.getGaussian(this.canvasWidth / 2, this.canvasWidth / 8);
        this.yGaussian = this.randomService.getGaussian(this.canvasHeight / 2, this.canvasHeight / 8);
        this.reset();
        this.tick();
    }

    tick() {
        if (this.isDrawing) {
            requestAnimationFrame(() => {
                this.tick()
            });
        }
        var x = this.xGaussian();
        var y = this.yGaussian();
        this.context.save();
        this.context.beginPath();
        this.context.arc(x, y, 10, 0, 2 * Math.PI);
        this.context.closePath(); 

        var r = this.randomService.getRandom()*255;
        var g = this.randomService.getRandom()*255;
        var b = this.randomService.getRandom()*255;
        var a = this.randomService.getRandom()/2;
        var color = new Color(r, g, b, a);
        this.context.fillStyle = color.toRGBA();
        this.context.fill();
        this.context.restore();
        //var newPos = this.walkerService.getNewPosition();
        //this.context.fillRect(newPos.x * 10, newPos.y * 10, 10, 10);
        //var pixelData = this.context.createImageData(16, 100);
        //this.randomService.fillImageData(pixelData);
        //this.context.putImageData(pixelData, 0, 0);
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