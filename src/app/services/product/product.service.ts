import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { Pagination } from 'src/app/models/Pagination.model';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private http: HttpClient) { }

    index(queryParams?: Params): Observable<Pagination<Product>> {
        return this.http.get<Pagination<Product>>('products', { params: queryParams });
    }

    show(url: string): Observable<Product> {
        return this.http.get<Product>(`products/${url}?url=true`);
    }
}
