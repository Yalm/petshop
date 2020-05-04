import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.sass']
})
export class CartComponent {

    constructor(public shoppingCartService: ShoppingCartService,
                private snackBar: MatSnackBar) { }

    deleteItem(id: number) {
        this.shoppingCartService.delete(id);
        this.snackBar.open('Su producto ha sido eliminado.', 'Ok', { duration: 5000 });
    }
}
