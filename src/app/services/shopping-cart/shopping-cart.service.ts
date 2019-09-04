import { Injectable } from '@angular/core';
import { ShoppingCart } from 'src/app/models/ShoppingCart.model';
import { ReplaySubject } from 'rxjs';
import { CartItem } from 'src/app/models/CartItem.model';

@Injectable({
    providedIn: 'root'
})

export class ShoppingCartService {

    cart$ = new ReplaySubject<ShoppingCart>();
    cartInit: ShoppingCart;

    constructor() {
        this.getCart();
    }

    add(item: CartItem): boolean {
        const result = this.cartInit.add(item);
        this.setNewValue();
        return result;
    }

    update(item: CartItem): void {
        const index = this.cartInit.items.findIndex(x => x.id === item.id);
        this.cartInit.items[index] = item;
        this.setNewValue();
    }

    delete(id: number): void {
        this.cartInit.delete(id);
        this.setNewValue();
    }

    reset(): void {
        this.cartInit.items = [];
        this.setNewValue();
    }

    shipping(total: number): void {
        this.cartInit.shipping = total;
        this.cart$.next(this.cartInit);
    }

    private getCart(): void {
        const items: CartItem[] = JSON.parse(localStorage.getItem('items')) || [];
        this.cartInit = new ShoppingCart(items);
        this.cart$.next(this.cartInit);
    }

    private setNewValue(): void {
        const CART_ADD = JSON.stringify(this.cartInit.items);
        localStorage.setItem('items', CART_ADD);
    }
}
