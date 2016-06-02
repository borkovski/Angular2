import { Component, OnInit } from '@angular/core'

import { IProduct } from './product';
import { ProductFilterPipe } from './product-filter.pipe';
import { StarComponent } from '../shared/star.component';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: 'views/products/product-list.component.html',
    styleUrls: ['css/products/product-list.component.css'],
    pipes: [ProductFilterPipe],
    directives: [StarComponent]
})
export class ProductListComponent implements OnInit {
    pageTitle: string = "Product list interpolated!";
    imageWidth: number = 50;
    imageMargin: number = 2;
    products: IProduct[] = null;
    showImage: boolean = false;
    listFilter: string = 'cart';

    constructor(private _productService: ProductService) {
    }

    ngOnInit(): void {
        this.products = this._productService.getProducts();
        console.log('In OnInit');
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    onRatingClicked(message: string) {
        this.pageTitle = 'Product List: ' + message;
    }
}