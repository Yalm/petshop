import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { HttpClient } from '@angular/common/http';
import { CreateFormData } from '../../shared/class/CreateFormData';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private http: HttpClient) { }

    store(data: Product): Observable<Product> {
        return this.http.post<Product>('products', CreateFormData({ data }));
    }

    show(id: number): Observable<Product> {
        return this.http.get<Product>(`products/${id}`);
    }

    update(data: Product): Observable<Product> {
        return this.http.post<Product>(`products/${data.id}`, CreateFormData({ data, update: true }));
    }

    count(): Observable<number> {
        return this.http.get<number>('product/count');
    }
}
