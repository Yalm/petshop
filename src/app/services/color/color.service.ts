import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/Color.model';

@Injectable({
    providedIn: 'root'
})
export class ColorService {

    constructor(private firestore: AngularFirestore) { }

    public index(): Observable<Color[]> {
        return this.firestore.collection<Color>('colors').valueChanges({ idField: 'id' });
    }
}
