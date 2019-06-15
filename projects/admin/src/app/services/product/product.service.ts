import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { map, tap, filter, switchMap } from 'rxjs/operators';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

    public index(category?: string, color?: string): Observable<Product[]> {
        return this.firestore.collection<Product>('products').valueChanges({ idField: 'id' })
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

    public store(data: any): Observable<AngularFireUploadTask | UploadTaskSnapshot> {
        // The storage path
        const path = `products/${new Date().getTime()}_${data.cover.name}`;
        return this.storage.upload(path, data.cover, { cacheControl: 'max-age=31536000' }).snapshotChanges().pipe(
            tap((snap: UploadTaskSnapshot) => {
                if (snap.bytesTransferred === snap.totalBytes) {
                    this.firestore.collection('products').add({
                        name: data.name,
                        price: data.price,
                        cover: path,
                        url: data.name.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase(),
                        stock: data.stock,
                        description: data.description,
                        short_description: data.short_description,
                        category: this.firestore.doc(data.category).ref,
                        color: data.color ? this.firestore.doc(data.color).ref : null,
                    });
                }
            }),
        );
    }

}
