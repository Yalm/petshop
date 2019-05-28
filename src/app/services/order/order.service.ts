import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/Order.model';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

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

    public index(): Observable<Order[]> {
        return this.afAuth.user.pipe(switchMap(user => {
            return this.firestore
                .collection('orders', ref => ref.where('customer', '==', this.firestore.doc(`customers/${user.uid}`).ref))
                .snapshotChanges().pipe(map(items => items.map(item => {
                    const data = item.payload.doc.data();
                    return { id: item.payload.doc.id, ...data } as Order;
                })));
        }));
    }

    public show(id: string): Observable<Order> {
        return this.order.doc(id).get().pipe(map(payload => {
            const data = payload.data();
            return { id: payload.id, ...data } as Order;
        }));
    }

    public store(culqi_token: string, plus_info?: string): Observable<Order> {
        const cart_id: string = localStorage.getItem('cart_id');
        return this.afAuth.idToken
            .pipe(switchMap(tokenUser => {
                return this.http.post<Order>(`https://us-central1-${environment.firebase.projectId}.cloudfunctions.net/order`,
                    { culqi_token, cart_id, plus_info }, {
                        headers: {
                            Authorization: `Bearer ${tokenUser}`
                        }
                    });
            }));
    }
}
