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

    public add(item: CartItem): Promise<void> {
        this.cart_init.add(item);
        return this.setNewValue();
    }

    public update(items: CartItem[]): Promise<void> {
        this.cart_init.items = items;
        return this.setNewValue();
    }

    public delete(id: string): Promise<void> {
        this.cart_init.delete(id);
        return this.setNewValue();
    }

    private getCart(): void {
        const cart: ShoppingCart = JSON.parse(localStorage.getItem('myCart')) || null;
        if (cart) {
            this.cart_init = new ShoppingCart(cart.items);
            this.cart$.next(this.cart_init);
        } else {
            this.cart_init = this.createNewCart();
            this.cart$.next(this.cart_init);
        }
    }

    private setNewValue(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const CART_ADD = JSON.stringify(this.cart_init);
                localStorage.setItem('myCart', CART_ADD);
                this.cart$.next(this.cart_init);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    private createNewCart(): ShoppingCart {
        return new ShoppingCart([]);
    }
}
