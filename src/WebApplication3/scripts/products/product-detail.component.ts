import { Component, OnInit } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { StarComponent } from '../shared/star.component';

@Component({
    templateUrl: 'views/products/product-detail.component.html',
    directives: [StarComponent]
})
export class ProductDetailComponent {
    pageTitle: string = 'Product details';
    product: IProduct;
    errorMessage: string;

    constructor(private _productService: ProductService, private _routeParams: RouteParams, private _router: Router) {
        let id = +this._routeParams.get('id');
        this.pageTitle += `: ${id}`;
    }
    
    ngOnInit() {
        if (!this.product) {
            let id = +this._routeParams.get('id');
            // this.pageTitle += `: ${id}`;
            this.getProduct(id);
        }
    }

    getProduct(id: number) {
        this._productService.getProduct(id)
            .subscribe(
            product => this.product = product,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this._router.navigate(['Products']);
    }
}