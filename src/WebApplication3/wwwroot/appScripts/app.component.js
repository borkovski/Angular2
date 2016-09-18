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
var noise_service_1 = require('./noise.service');
var AppComponent = (function () {
    function AppComponent(walkerService, randomService, noiseService) {
        this.walkerService = walkerService;
        this.randomService = randomService;
        this.noiseService = noiseService;
        this.isDrawing = true;
        this.time = 0;
        this.zoom = 25;
        this.renderResolution = 25;
        this.speed = 25;
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        this.myCanvas = document.getElementById("myCanvas");
        this.context = this.myCanvas.getContext("2d");
        this.canvasHeight = this.myCanvas.height;
        this.canvasWidth = this.myCanvas.width;
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
        this.reset();
        var currentRenderResolution = this.renderResolution;
        for (var i = 0; i < this.canvasWidth; i += currentRenderResolution) {
            for (var j = 0; j < this.canvasHeight; j += currentRenderResolution) {
                var noise = this.noiseService.getPerlin(i * this.zoom / this.canvasHeight, j * this.zoom / this.canvasWidth, this.time);
                var color = new color_1.Color(noise * 512, noise * 256, 0, 1);
                this.context.fillStyle = color.toRGBA();
                this.context.fillRect(i, j, currentRenderResolution, currentRenderResolution);
            }
        }
        this.time += this.speed / 100;
    };
    AppComponent.prototype.changeZoom = function (value) {
        this.zoom = +value;
    };
    AppComponent.prototype.changeResolution = function (value) {
        this.renderResolution = +value;
    };
    AppComponent.prototype.changeSpeed = function (value) {
        this.speed = +value;
    };
    AppComponent.prototype.toggleDrawing = function () {
        this.isDrawing = !this.isDrawing;
        if (this.isDrawing) {
            this.tick();
        }
    };
    AppComponent.prototype.reset = function (withRanges) {
        if (withRanges === void 0) { withRanges = false; }
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.walkerService.set(this.canvasWidth / 20, this.canvasHeight / 20);
        if (withRanges) {
            this.zoom = 25;
            this.renderResolution = 25;
            this.speed = 25;
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "views/app.component.html",
            providers: [walker_service_1.WalkerService, random_service_1.RandomService, noise_service_1.NoiseService]
        }), 
        __metadata('design:paramtypes', [walker_service_1.WalkerService, random_service_1.RandomService, noise_service_1.NoiseService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map