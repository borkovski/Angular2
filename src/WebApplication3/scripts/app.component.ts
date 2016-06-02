import { Component } from "@angular/core";
import { HTTP_PROVIDERS } from "@angular/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { ProductListComponent } from "./products/product-list.component";
import { ProductService } from './products/product.service';

@Component({
    selector: "my-app",
    templateUrl: "views/app.component.html",
    directives: [ProductListComponent],
    providers: [ProductService, HTTP_PROVIDERS]
})
export class AppComponent {
    pageTitle: string = "My First Angular 2";
}