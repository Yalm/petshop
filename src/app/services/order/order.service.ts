import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/Order.model';
import { Observable, observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private order: AngularFirestoreCollection;

    constructor(private firestore: AngularFirestore,
        private afAuth: AngularFireAuth,
        private http: HttpClient) {
        this.order = this.firestore.collection('orders');
    }

    public show(id: string): Observable<Order> {
        return this.order.doc(id).get().pipe(map(payload => {
            const data = payload.data();
            return { id: payload.id, ...data } as Order;
        }));
    }

    public store(token: string): Observable<any> {
        return this.afAuth.idToken
            .pipe(switchMap(tokenUser => {
                return this.http.post('http://localhost:5000/yalm-94feb/us-central1/order', { token }, {
                    headers: {
                        Authorization: `Bearer ${tokenUser}`
                    }
                });
            }));
    }
}
