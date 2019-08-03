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

    public index(options?: { onlyChilds?: boolean, all?: boolean }): Observable<Category[]> {
        return this.http.get<Category[]>('categories').pipe(
            share(),
            map(items => {
                if(!options) {
                    return items.filter(category => category.parent_id == null).reduce((categories: Category[], category) => {
                        category.categories = items.filter(x => x.parent_id == category.id);
                        categories.push(category);
                        return categories;
                    }, []);
                }

                if (options.all) {
                    return items.reduce((categories: Category[], category) => {
                        category.categories = items.filter(x => x.parent_id == category.id);
                        categories.push(category);
                        return categories;
                    }, []);
                } else if (options.onlyChilds) {
                    return items.filter(category => category.parent_id != null);
                }
            })
        );
    }

    public show(id: number): Observable<Category> {
        return this.http.get<Category>(`categories/${id}`);
    }

    public store(data: { name: string, parent_id?: number }): Observable<Category> {
        return this.http.post<Category>('categories', data);
    }

    public update(data: Category): Observable<Category> {
        return this.http.put<Category>(`categories/${data.id}`, data);
    }

    public destroy(id: number): Observable<Category> {
        return this.http.delete<Category>(`categories/${id}`);
    }
}
