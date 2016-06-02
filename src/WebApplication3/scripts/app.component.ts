import { Component } from "@angular/core";
import { ProductListComponent } from "./products/product-list.component";
import { ProductService } from './products/product.service';

@Component({
    selector: "my-app",
    templateUrl: "views/app.component.html",
    directives: [ProductListComponent],
    providers: [ProductService]
})
export class AppComponent {
    pageTitle: string = "My First Angular 2";
}