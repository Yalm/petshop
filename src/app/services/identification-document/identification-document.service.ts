import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { IdentificationDocument } from 'src/app/models/IdentificationDocument.model';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    constructor(private firestore: AngularFirestore) { }

    public index(): Observable<IdentificationDocument[]> {
        return this.firestore
            .collection<IdentificationDocument>('documents')
            .valueChanges({idField: 'id'});
    }
}
