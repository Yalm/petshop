import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/Category.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) { }

    public index(): Observable<any> {
        return this.http.get<Category[]>('categories').pipe(
            share()
        );
    }
}
