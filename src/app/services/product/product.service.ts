import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { Pagination } from 'src/app/models/Pagination.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private http: HttpClient) { }

    public index(category?: string, color?: string, page: number = 1): Observable<Product[]> {
        return this.http.get<Pagination<Product>>(`products?page=${page}&category=${category}&color=${color}`)
            .pipe(
                map(response => response.data)
            );
    }

    public show(url: string): Observable<Product> {
        return this.http.get<Product>(`products/${url}`);
    }
}
