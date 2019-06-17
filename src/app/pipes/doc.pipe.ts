import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { CategoryService } from '../services/category/category.service';
import { Category } from '../models/Category.model';

@Pipe({
    name: 'docCategory'
})
export class DocPipe implements PipeTransform {

    constructor(private category: CategoryService) { }

    transform(value: DocumentReference): Observable<Category> {
        if (value) {
            return this.category.index().pipe(map(items => {
                const parent = items.find(parents => parents.categories.find(child => child.path == value.path) ? true : false);
                const category = parent.categories.find(child => child.path == value.path);
                return category;
            }));
        } else {
            return of(null);
        }
    }

}
