import { Component, OnInit, ElementRef } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { CartItem } from 'src/app/models/CartItem.model';

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
        this.shoppingCartService.delete(id).then();
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
