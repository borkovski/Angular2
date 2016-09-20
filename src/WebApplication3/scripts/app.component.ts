import {Component, AfterViewInit} from "@angular/core";
import {ICoordinates, Vector2d} from './position';
import {INaturalObject, NaturalObject} from './naturalObject';
import {IColor, Color} from './color';

@Component({
    selector: "my-app",
    templateUrl: "views/app.component.html",
    providers: []
})
export class AppComponent implements AfterViewInit {
    context: CanvasRenderingContext2D;
    myCanvas: HTMLCanvasElement;
    canvasWidth: number;
    canvasHeight: number;
    isDrawing: boolean = true;
    testObjects: INaturalObject[];
    wind: ICoordinates;
    gravity: ICoordinates;
    airFriction: number;
    waterFriction: number;
    groundFriction: number;
    hasWater: boolean;
    restitution: number;

    constructor() {
        this.wind = new Vector2d(0.02, 0);
        this.gravity = new Vector2d(0, 1);
        this.airFriction = .01;
        this.waterFriction = .1;
        this.groundFriction = .1;
        this.restitution = .8;
        this.hasWater = false;
    }

    ngAfterViewInit() {
        this.myCanvas = document.getElementById("myCanvas") as HTMLCanvasElement;
        this.context = this.myCanvas.getContext("2d");
        this.canvasHeight = this.myCanvas.height;
        this.canvasWidth = this.myCanvas.width;
        this.reset(true);
        this.tick();
    }

    tick() {
        if (this.isDrawing) {
            requestAnimationFrame(() => {
                this.tick()
            });
        }
        this.reset();
        //draw water
        if (this.hasWater) {
            this.context.fillStyle = "azure";
            this.context.fillRect(0, this.canvasHeight / 2, this.canvasWidth, this.canvasHeight / 2);
        }
        //iterate through objects
        for (var i = 0; i < this.testObjects.length; i++) {
            var objectForces = [];
            //if object is currently under water - add water drag
            if (this.hasWater && this.testObjects[i].position.y > this.canvasHeight / 2) {
                var waterDragMagnitude = this.waterFriction * this.testObjects[i].velocity.mag() * this.testObjects[i].velocity.mag();
                var waterDrag = this.testObjects[i].velocity.clone().mult(-1).normalize().mult(waterDragMagnitude);
                objectForces.push(waterDrag);
            }
            //otherwise - add wind
            else {
                objectForces.push(this.wind);
            }
            //gravity applies every object
            objectForces.push(this.gravity.clone().mult(this.testObjects[i].mass));
            //ground friction applies only when on the ground
            if (Math.round(this.testObjects[i].position.y + this.testObjects[i].radius) == this.testObjects[i].boundaries.y) {
                var groundFriction = this.testObjects[i].velocity.clone().mult(-1).normalize().mult(this.groundFriction).mult(this.testObjects[i].mass);
                groundFriction.y = 0;
                objectForces.push(groundFriction);
            }
            this.testObjects[i].setForces(objectForces);
            this.testObjects[i].update();
            this.testObjects[i].draw(this.context);
        }
    }

    changeWind(value) {
        this.wind.x = +value;
    }

    changeRestitution(value) {
        this.restitution = +value;
        for (var i = 0; i < this.testObjects.length; i++) {
            this.testObjects[i].restitution = this.restitution;
        }
    }

    toggleWater() {
        this.hasWater = !this.hasWater;
    }

    reset(withObjects = false) {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        if (withObjects) {
            this.testObjects = [];
            for (var i = 0; i < 10; i++) {
                this.testObjects.push(
                    new NaturalObject(
                        new Vector2d(Math.random() * this.canvasWidth, Math.random() * this.canvasHeight),
                        0.5 + Math.random() * 2.5,
                        this.restitution,
                        new Vector2d(this.canvasWidth, this.canvasHeight)
                    )
                );
            }
        }
    }
}