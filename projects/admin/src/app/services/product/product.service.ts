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

}
