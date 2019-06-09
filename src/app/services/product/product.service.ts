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
        return this.firestore
            .collection<Product>('products', ref => category ? ref.where('category', '==', this.firestore.doc(`categories/${category}`).ref) : ref)
            .valueChanges({ idField: 'id' });
    }

    public show(url: string): Observable<Product> {
        return this.firestore.collection<Product>('products', ref => ref.where('url', '==', url))
            .valueChanges({ idField: 'id' })
            .pipe(
                map(x => {
                    if (x.length < 0) return null;
                    else return x[0];
                })
            );
    }

}
