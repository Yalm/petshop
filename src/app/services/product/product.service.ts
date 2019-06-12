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

    public index(category?: string, color?: string): Observable<Product[]> {
        return this.firestore.collection<Product>('products', ref => {
            let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
            if (category) { query = query.where('category', '==', this.firestore.doc(category).ref) };
            if (color) { query = query.where('color', '==', this.firestore.doc(color).ref) };
            return query;
        }).valueChanges({ idField: 'id' })
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
