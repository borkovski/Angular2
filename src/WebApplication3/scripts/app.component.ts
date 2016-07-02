import {Component, AfterViewInit, ContentChild} from "@angular/core";
@Component({
    selector: "my-app",
    templateUrl: "views/app.component.html"
})
export class AppComponent implements AfterViewInit {
    context: CanvasRenderingContext2D;
    myCanvas: HTMLCanvasElement;
    pixelData: ImageData;
    canvasWidth: number;
    canvasHeight: number;

    ngAfterViewInit() {
        this.myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        this.context = this.myCanvas.getContext("2d");
        this.canvasHeight = this.myCanvas.height;
        this.canvasWidth = this.myCanvas.width;

        this.pixelData = this.context.createImageData(this.canvasWidth, this.canvasHeight);
        this.tick();
    }

    tick() {
        requestAnimationFrame(() => {
            this.tick()
        });

        var ctx = this.context;
        ctx.clearRect(0, 0, 400, 400);
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, 111, 222);
    }
}