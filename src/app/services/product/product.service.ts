import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { Pagination } from 'src/app/models/Pagination.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Params } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private http: HttpClient) { }

    public index(queryParams?: Params): Observable<Pagination<Product>> {
        return this.http.get<Pagination<Product>>('products', { params: queryParams })
    }

    public show(url: string): Observable<Product> {
        return this.http.get<Product>(`products/${url}`);
    }
}
