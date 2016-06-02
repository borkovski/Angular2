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
var http_1 = require("@angular/http");
var router_deprecated_1 = require("@angular/router-deprecated");
require('rxjs/add/operator/map');
var product_list_component_1 = require("./products/product-list.component");
var product_detail_component_1 = require("./products/product-detail.component");
var product_service_1 = require('./products/product.service');
var welcome_component_1 = require('./home/welcome.component');
var AppComponent = (function () {
    function AppComponent() {
        this.pageTitle = "My First Angular 2";
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "views/app.component.html",
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [product_service_1.ProductService, http_1.HTTP_PROVIDERS, router_deprecated_1.ROUTER_PROVIDERS]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/', redirectTo: ['/Welcome'] },
            { path: '/welcome', component: welcome_component_1.WelcomeComponent, as: 'Welcome' },
            { path: '/products', component: product_list_component_1.ProductListComponent, as: 'Products' },
            { path: '/product/:id', component: product_detail_component_1.ProductDetailComponent, as: 'ProductDetail' }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
