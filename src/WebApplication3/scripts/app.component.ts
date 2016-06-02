import { Component } from "@angular/core";
import { HTTP_PROVIDERS } from "@angular/http";
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from "@angular/router-deprecated";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { ProductListComponent } from "./products/product-list.component";
import { ProductDetailComponent } from "./products/product-detail.component";
import { ProductService } from './products/product.service';
import { WelcomeComponent } from './home/welcome.component';

@Component({
    selector: "my-app",
    templateUrl: "views/app.component.html",
    directives: [ROUTER_DIRECTIVES],
    providers: [ProductService, HTTP_PROVIDERS, ROUTER_PROVIDERS]
})
@RouteConfig([
        { path: '/', redirectTo: ['/Welcome'] },
        { path: '/welcome', component: WelcomeComponent, as: 'Welcome' },
        { path: '/products', component: ProductListComponent, as: 'Products' },
        { path: '/product/:id', component: ProductDetailComponent, as: 'ProductDetail' }
        ])
export class AppComponent {
    pageTitle: string = "My First Angular 2";
}