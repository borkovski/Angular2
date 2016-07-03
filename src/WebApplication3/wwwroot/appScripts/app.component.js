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
var color_1 = require('./color');
var walker_service_1 = require('./walker.service');
var random_service_1 = require('./random.service');
var AppComponent = (function () {
    function AppComponent(walkerService, randomService) {
        this.walkerService = walkerService;
        this.randomService = randomService;
        this.isDrawing = true;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        this.myCanvas = document.getElementById("myCanvas");
        this.context = this.myCanvas.getContext("2d");
        this.canvasHeight = this.myCanvas.height;
        this.canvasWidth = this.myCanvas.width;
        this.xGaussian = this.randomService.getGaussian(this.canvasWidth / 2, this.canvasWidth / 8);
        this.yGaussian = this.randomService.getGaussian(this.canvasHeight / 2, this.canvasHeight / 8);
        this.reset();
        this.tick();
    };
    AppComponent.prototype.tick = function () {
        var _this = this;
        if (this.isDrawing) {
            requestAnimationFrame(function () {
                _this.tick();
            });
        }
        var x = this.xGaussian();
        var y = this.yGaussian();
        this.context.save();
        this.context.beginPath();
        this.context.arc(x, y, 10, 0, 2 * Math.PI);
        this.context.closePath();
        var r = this.randomService.getRandom() * 255;
        var g = this.randomService.getRandom() * 255;
        var b = this.randomService.getRandom() * 255;
        var a = this.randomService.getRandom() / 2;
        var color = new color_1.Color(r, g, b, a);
        this.context.fillStyle = color.toRGBA();
        this.context.fill();
        this.context.restore();
        //var newPos = this.walkerService.getNewPosition();
        //this.context.fillRect(newPos.x * 10, newPos.y * 10, 10, 10);
        //var pixelData = this.context.createImageData(16, 100);
        //this.randomService.fillImageData(pixelData);
        //this.context.putImageData(pixelData, 0, 0);
    };
    AppComponent.prototype.toggleDrawing = function () {
        this.isDrawing = !this.isDrawing;
        if (this.isDrawing) {
            this.tick();
        }
    };
    AppComponent.prototype.reset = function () {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.walkerService.set(this.canvasWidth / 20, this.canvasHeight / 20);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "views/app.component.html",
            providers: [walker_service_1.WalkerService, random_service_1.RandomService]
        }), 
        __metadata('design:paramtypes', [walker_service_1.WalkerService, random_service_1.RandomService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
