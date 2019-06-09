import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.sass']
})
export class ShopComponent implements OnInit, OnDestroy {

    public products: Product[];
    private subscription: Subscription;
    private routerSubscription: Subscription;
    public category: string;

    constructor(private productService: ProductService,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.routerSubscription = this.route.queryParams.subscribe(params => {
            if (params.category) {
                this.category = params.category;
                if (this.subscription) this.subscription.unsubscribe();
                this.getProducts(params.category);
            }
        });
        this.getProducts();
    }

    getProducts(category?: string) {
        this.subscription = this.productService.index()
            .subscribe(response => this.products = response);
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
        this.subscription.unsubscribe();
    }

}
