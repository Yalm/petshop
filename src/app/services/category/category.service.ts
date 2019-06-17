import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Category } from 'src/app/models/Category.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private firestore: AngularFirestore) { }

    public index(): Observable<Category[]> {
        return this.firestore
            .collectionGroup('categories')
            .snapshotChanges()
            .pipe(
                map(items => {
                    return items.reduce((categories: Category[], item) => {
                        if (!item.payload.doc.ref.parent.parent) {
                            let indexFind = categories.findIndex(category => category.id == item.payload.doc.id);
                            if (indexFind >= 0) {
                                categories[indexFind] = Object.assign(categories[indexFind], item.payload.doc.data());
                            } else {
                                categories.push({ id: item.payload.doc.id, path: item.payload.doc.ref.path, categories: [], ...item.payload.doc.data() } as Category);
                            }
                        } else {
                            let indexFind = categories.findIndex(category => category.id == item.payload.doc.ref.parent.parent.id);
                            categories[indexFind].categories.push({ id: item.payload.doc.id, path: item.payload.doc.ref.path, ...item.payload.doc.data() } as Category);
                        }
                        return categories;
                    }, []);
                })
            );
    }
}
