import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { CartItem } from 'src/app/models/CartItem.model';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {


    constructor(public shoppingCartService: ShoppingCartService,
        private snackBar: MatSnackBar) { }

    ngOnInit() {
    }

    deleteItem(id: string) {
        this.shoppingCartService.delete(id).then(() => {
            this.snackBar.open('Su producto ha sido eliminado.', 'Ok');
        });
    }

    updateItem(items: CartItem[], btn: any) {
        btn.innerHTML = 'Cargando...';
        btn.disabled = true;

        items.map(item => {
            item.quantity = item['quantity_edit'] || item.quantity;
            delete item['quantity_edit'];
            return item;
        });

        this.shoppingCartService.update(items).then(() => {
            btn.innerHTML = 'Actualizar carrito';
            btn.disabled = false;
        }).catch(() => {
            btn.innerHTML = 'Actualizar carrito';
            btn.disabled = false;
        });
    }

}
