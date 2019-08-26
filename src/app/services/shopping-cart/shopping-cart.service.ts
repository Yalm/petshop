import { Injectable } from '@angular/core';
import { ShoppingCart } from 'src/app/models/ShoppingCart.model';
import { ReplaySubject } from 'rxjs';
import { CartItem } from 'src/app/models/CartItem.model';

@Injectable({
    providedIn: 'root'
})

export class ShoppingCartService {

    public cart$ = new ReplaySubject<ShoppingCart>();
    cart_init: ShoppingCart;

    constructor() {
        this.getCart();
    }

    add(item: CartItem): boolean {
        const result = this.cart_init.add(item);
        this.setNewValue();
        return result;
    }

    update(item: CartItem): void {
        const index = this.cart_init.items.findIndex(x => x.id == item.id);
        this.cart_init.items[index] = item;
        this.setNewValue();
    }

    delete(id: number): void {
        this.cart_init.delete(id);
        this.setNewValue();
    }

    reset(): void {
        this.cart_init.items = [];
        this.setNewValue();
    }

    shipping(total: number): void {
        this.cart_init.shipping = total;
        this.cart$.next(this.cart_init);
    }

    private getCart(): void {
        const items: CartItem[] = JSON.parse(localStorage.getItem('items')) || [];
        this.cart_init = new ShoppingCart(items);
        this.cart$.next(this.cart_init);
    }

    private setNewValue(): void {
        const CART_ADD = JSON.stringify(this.cart_init.items);
        localStorage.setItem('items', CART_ADD);
    }
}
