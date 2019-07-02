import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/Category.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { share, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) { }

    public index(onlyChilds: boolean = false): Observable<any> {
        return this.http.get<Category[]>('categories').pipe(
            share(),
            map(items => {
                if (onlyChilds) {
                    return items.reduce((data: Category[], items) => data.concat(items.categories), []);
                } else {
                    return items;
                }
            }),
        );
    }
}
