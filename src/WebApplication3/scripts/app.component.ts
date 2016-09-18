import {Component, AfterViewInit} from "@angular/core";
import {IPosition, Position} from './position';
import {IColor, Color} from './color';
import {WalkerService} from './walker.service';
import {RandomService} from './random.service';
import {NoiseService} from './noise.service';

@Component({
    selector: "my-app",
    templateUrl: "views/app.component.html",
    providers: [WalkerService, RandomService, NoiseService]
})
export class AppComponent implements AfterViewInit {
    context: CanvasRenderingContext2D;
    myCanvas: HTMLCanvasElement;
    canvasWidth: number;
    canvasHeight: number;
    isDrawing: boolean = true;
    time = 0;
    zoom = 25;
    renderResolution = 25;
    speed = 25;

    constructor(private walkerService: WalkerService, private randomService: RandomService, private noiseService: NoiseService) {
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
        this.reset();
        var currentRenderResolution = this.renderResolution;
        for (var i = 0; i < this.canvasWidth; i += currentRenderResolution) {
            for (var j = 0; j < this.canvasHeight; j += currentRenderResolution) {
                var noise = this.noiseService.getPerlin(i * this.zoom / this.canvasHeight, j * this.zoom / this.canvasWidth, this.time);
                var color = new Color(noise * 512, noise * 256, 0, 1);
                this.context.fillStyle = color.toRGBA();
                this.context.fillRect(i, j, currentRenderResolution, currentRenderResolution);
            }
        }
        this.time += this.speed/100;
    }

    changeZoom(value) {
        this.zoom = +value;
    }

    changeResolution(value) {
        this.renderResolution = +value;
    }

    changeSpeed(value) {
        this.speed = +value;
    }

    toggleDrawing() {
        this.isDrawing = !this.isDrawing;
        if (this.isDrawing) {
            this.tick();
        }
    }

    reset(withRanges = false) {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.walkerService.set(this.canvasWidth / 20, this.canvasHeight / 20);
        if (withRanges) {
            this.zoom = 25;
            this.renderResolution = 25;
            this.speed = 25;
        }
    }
}