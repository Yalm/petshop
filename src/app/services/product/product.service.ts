import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private firestore: AngularFirestore) { }

    public index(category?: string): Observable<Product[]> {
        if (category) {
            return this.firestore
                .collection('products', ref => ref.where('category', '==', this.firestore.doc(`categories/${category}`).ref))
                .snapshotChanges().pipe(map(items => items.map(item => {
                    const data = item.payload.doc.data();
                    return { id: item.payload.doc.id, ...data } as Product;
                })));
        } else {
            return this.firestore
                .collection('products')
                .snapshotChanges().pipe(map(items => items.map(item => {
                    const data = item.payload.doc.data();
                    return { id: item.payload.doc.id, ...data } as Product;
                })));
        }
    }

    public show(id: string): Observable<Product> {
        return this.firestore.collection('products').doc(id).get().pipe(
            map(payload => {
                if (!payload.exists) { return null }
                const data = payload.data() as Product;
                return { id: payload.id, ...data };
            }));
    }

}
