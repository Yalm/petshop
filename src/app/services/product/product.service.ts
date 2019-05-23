import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, iif } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { CategoryService } from '../category/category.service';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private firestore: AngularFirestore,
        private categoryService: CategoryService,
        private http: HttpClient) { }

    public index(): Observable<any> {
        return this.http.get<Product[]>('https://petshopj.herokuapp.com/api/products');
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
