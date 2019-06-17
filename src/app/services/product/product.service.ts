import { Injectable } from '@angular/core';
import { Observable, throwError, combineLatest } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { docJoin } from 'src/app/shared/operators/docJoin';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

    public index(category?: string, color?: string): Observable<any> {
        return this.firestore.collection<Product>('products', ref => {
            let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
            if (category) { query = query.where('category', '==', this.firestore.doc(category).ref) };
            if (color) { query = query.where('color', '==', this.firestore.doc(color).ref) };
            return query;
        }).valueChanges({ idField: 'id' }).pipe(
            switchMap((items) => {
                const covers$ = items.map(item => {
                    return this.storage.ref(item.cover as string).getDownloadURL();
                })
                return combineLatest(covers$).pipe(
                    map(urls => urls.map((item: string, index) => {
                        const data = items[index];
                        data.cover = item;
                        return data;
                    }))
                );
            })
        )
    }

    public show(url: string): Observable<Product> {
        return this.firestore.collection<Product>('products', ref => ref.where('url', '==', url))
            .valueChanges({ idField: 'id' })
            .pipe(
                switchMap(x => {
                    if (x.length < 0) {
                        return throwError(null);
                    } else {
                        return this.storage.ref(x[0].cover as string).getDownloadURL()
                            .pipe(
                                map((item: string) => {
                                    const data = x[0];
                                    data.cover = item;
                                    return data;
                                })
                            );
                    }
                }),
                docJoin(['color'])
            );
    }
}
