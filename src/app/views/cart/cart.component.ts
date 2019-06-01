import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { CartItem } from 'src/app/models/CartItem.model';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {


    constructor(public shoppingCartService: ShoppingCartService) { }

    ngOnInit() {
    }

    deleteItem(id: string) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '¡Sí, bórralo!'
        }).then((result) => {
            if (result.value) {
                this.shoppingCartService.delete(id).then();
                Swal.fire(
                    'Eliminado',
                    'Su archivo ha sido eliminado.',
                    'success'
                )
            }
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
