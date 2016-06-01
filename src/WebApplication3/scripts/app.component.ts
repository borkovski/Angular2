import {Component} from "@angular/core";
import {ProductListComponent} from "./products/product-list.component";
@Component({
    selector: "my-app",
    templateUrl: "views/app.component.html",
    directives: [ProductListComponent]
})
export class AppComponent {
    pageTitle: string = "My First Angular 2";
}