import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {


    constructor(private shoppingCartService: ShoppingCartService) { }

    ngOnInit() {
    }

    deleteItem(id: string) {
        this.shoppingCartService.delete(id).then(response => {
            //console.log(response);
        });
    }

}
