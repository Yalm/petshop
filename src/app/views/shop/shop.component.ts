import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.sass']
})
export class ShopComponent implements OnInit, OnDestroy {

    public products: Product[];
    private subscription: Subscription;

    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.subscription = this.productService.index().subscribe(response => this.products = response);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
