import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Category } from 'src/app/models/Category.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private category: AngularFirestoreCollection;

    constructor(private firestore: AngularFirestore) {
        this.category = this.firestore.collection('categories');
    }

    public show(id: string): Observable<Category> {
        return this.category.doc(id).get().pipe(map(payload => {
            const data = payload.data();
            return { id: payload.id, ...data } as Category;
        }));
    }
}
