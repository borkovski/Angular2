"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var position_1 = require('./position');
var naturalObject_1 = require('./naturalObject');
var AppComponent = (function () {
    function AppComponent() {
        this.isDrawing = true;
        this.wind = new position_1.Vector2d(0.02, 0);
        this.gravity = new position_1.Vector2d(0, 1);
        this.airFriction = .01;
        this.waterFriction = .1;
        this.groundFriction = .1;
        this.restitution = .8;
        this.hasWater = false;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        this.myCanvas = document.getElementById("myCanvas");
        this.context = this.myCanvas.getContext("2d");
        this.canvasHeight = this.myCanvas.height;
        this.canvasWidth = this.myCanvas.width;
        this.reset(true);
        this.tick();
    };
    AppComponent.prototype.tick = function () {
        var _this = this;
        if (this.isDrawing) {
            requestAnimationFrame(function () {
                _this.tick();
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
    };
    AppComponent.prototype.changeWind = function (value) {
        this.wind.x = +value;
    };
    AppComponent.prototype.changeRestitution = function (value) {
        this.restitution = +value;
        for (var i = 0; i < this.testObjects.length; i++) {
            this.testObjects[i].restitution = this.restitution;
        }
    };
    AppComponent.prototype.toggleWater = function () {
        this.hasWater = !this.hasWater;
    };
    AppComponent.prototype.reset = function (withObjects) {
        if (withObjects === void 0) { withObjects = false; }
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        if (withObjects) {
            this.testObjects = [];
            for (var i = 0; i < 10; i++) {
                this.testObjects.push(new naturalObject_1.NaturalObject(new position_1.Vector2d(Math.random() * this.canvasWidth, Math.random() * this.canvasHeight), 0.5 + Math.random() * 2.5, this.restitution, new position_1.Vector2d(this.canvasWidth, this.canvasHeight)));
            }
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "views/app.component.html",
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
