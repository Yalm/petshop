import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/Product.model';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private http: HttpClient) { }

    store(data: Product): Observable<Product> {
        return this.http.post<Product>('products', data).pipe(
            switchMap((response) => this.upload(data.cover, response.id))
        );
    }

    show(id: number): Observable<Product> {
        return this.http.get<Product>(`products/${id}`);
    }

    update(data: Product): Observable<Product> {
        return this.http.put<Product>(`products/${data.id}`, data).pipe(
            switchMap((response) => this.upload(data.cover, response.id))
        );
    }

    count(): Observable<number> {
        return this.http.get<number>('product/count');
    }

    private upload(data: string | File, id: number): Observable<Product> {
        if (data instanceof File) {
            const FORM_DATA = new FormData();
            FORM_DATA.append('cover', data);
            return this.http.post<Product>(`product/upload/${id}`, FORM_DATA).pipe(
                catchError(() => of(null))
            );
        } else {
            return of(null);
        }
    }
}
