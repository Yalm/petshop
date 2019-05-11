import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/models/ShoppingCart.model';
import { CartItem } from 'src/app/models/CartItem.model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})

export class ShoppingCartService {

    private cart_init: ShoppingCart;
    public cart$: Observable<ShoppingCart>;

    constructor(private firestore: AngularFirestore) {
        this.getCart();
    }

    public add(item: CartItem) {
        let itemReturn;
        switch (this.cart_init.add(item)) {
            case 'add':
                itemReturn = this.firestore.doc(`carts/${this.cart_init.id}`)
                    .update({ items: firebase.firestore.FieldValue.arrayUnion(this.cart_init.convertInJson(item.id)) })
                    .catch(() => {
                        this.cart_init.delete(item.id);
                    });
                break;
            case 'update':
                itemReturn = this.firestore.firestore.runTransaction(transaction => {
                        const cartRef = this.firestore.firestore.doc(`carts/${this.cart_init.id}`);
                        return transaction.get(cartRef).then(doc => {
                            const items = doc.data().items;
                            const index = this.cart_init.items.findIndex(x => x.id == item.id);
                            items[index].quantity = this.cart_init.items[index].quantity;
                            transaction.update(cartRef, { items: items });
                        });
                    }).catch(() => {
                        this.cart_init.delete(item.id);
                    });
                break;

            default:
                itemReturn = new Promise<void>(resolve => resolve());
                break;
        }
        return itemReturn;
    }

    public getitems() :CartItem[] {
        return this.cart_init.items;
    }

    public delete(id: string) {
        const index = this.cart_init.items.findIndex(x => x.id == id);
        return this.firestore.doc(`carts/${this.cart_init.id}`)
            .update({ items: firebase.firestore.FieldValue.arrayRemove(this.cart_init.items[index]) });
    }

    private getCart(): void {
        const id: string = localStorage.getItem('cart_id') || null;
        if (id) {
            this.cart$ = this.firestore.doc(`carts/${id}`).snapshotChanges().pipe(
                shareReplay(1),
                map(
                cart => {
                    const data: any = cart.payload.data();
                    this.cart_init = new ShoppingCart(cart.payload.id, data.items || []);
                    return this.cart_init;
                }));
        } else {
            this.cart$ = this.createNewCart();
        }
    }

    private createNewCart(): Observable<ShoppingCart> {
        return new Observable<DocumentReference>((observer) => {
            this.firestore.collection('carts').add({}).then(data => {
                localStorage.setItem('cart_id', data.id);
                observer.next(data);
                observer.complete();
            });
        }).pipe(switchMap(cart => {
            return this.firestore.doc(`carts/${cart.id}`).snapshotChanges().pipe(
                map((cart) => {
                const data: any = cart.payload.data();
                this.cart_init = new ShoppingCart(cart.payload.id, data.items || []);
                return this.cart_init;
            }));
        }));
    }
}
