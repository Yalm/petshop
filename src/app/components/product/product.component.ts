import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

    @Input() product: Product;

    constructor(private shoppingCartService: ShoppingCartService) { }
    ngOnInit() {
    }

    addCartProduct() {
        this.shoppingCartService.add({ ...this.product, quantity: 1 });
    }
}
