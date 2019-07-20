import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private http: HttpClient) { }

    public store(data: any): Observable<Product> {
        const form_data = new FormData();
        for (const key in data) {
            form_data.append(key, data[key]);
        }
        return this.http.post<Product>('products', form_data);
    }

    public show(id: number): Observable<Product> {
        return this.http.get<Product>(`products/${id}?id=true`);
    }

    public update(data: any): Observable<Product> {
        const form_data = new FormData();
        for (const key in data) {
            form_data.append(key, data[key]);
        }
        form_data.delete('id');
        form_data.append('_method','PUT');
        return this.http.post<Product>(`products/${data.id}`, form_data);
    }

    public count(): Observable<number> {
        return this.http.get<number>('products/count');
    }
}
