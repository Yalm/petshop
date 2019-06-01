import { Injectable } from '@angular/core';
import { Customer } from 'src/app/views/auth/models/customer';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private firestore: AngularFirestore,
        private afAuth: AngularFireAuth, ) {
    }

    public edit(data: Customer): Promise<void> {
        return this.firestore.doc(`customers/${data.uid}`).update(data);
    }
}
