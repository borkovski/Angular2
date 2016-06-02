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
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var product_service_1 = require('./product.service');
var star_component_1 = require('../shared/star.component');
var ProductDetailComponent = (function () {
    function ProductDetailComponent(_productService, _routeParams, _router) {
        this._productService = _productService;
        this._routeParams = _routeParams;
        this._router = _router;
        this.pageTitle = 'Product details';
        var id = +this._routeParams.get('id');
        this.pageTitle += ": " + id;
    }
    ProductDetailComponent.prototype.ngOnInit = function () {
        if (!this.product) {
            var id = +this._routeParams.get('id');
            // this.pageTitle += `: ${id}`;
            this.getProduct(id);
        }
    };
    ProductDetailComponent.prototype.getProduct = function (id) {
        var _this = this;
        this._productService.getProduct(id)
            .subscribe(function (product) { return _this.product = product; }, function (error) { return _this.errorMessage = error; });
    };
    ProductDetailComponent.prototype.onBack = function () {
        this._router.navigate(['Products']);
    };
    ProductDetailComponent = __decorate([
        core_1.Component({
            templateUrl: 'views/products/product-detail.component.html',
            directives: [star_component_1.StarComponent]
        }), 
        __metadata('design:paramtypes', [product_service_1.ProductService, router_deprecated_1.RouteParams, router_deprecated_1.Router])
    ], ProductDetailComponent);
    return ProductDetailComponent;
}());
exports.ProductDetailComponent = ProductDetailComponent;
