import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order, Payment } from 'src/app/models/Order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }

    update(data: Order): Observable<Order> {
        return this.http.put<Order>(`orders/${data.id}`, data);
    }

    payment(data: Payment): Observable<Payment> {
        return this.http.post<Payment>('order/payment', data);
    }

    count(): Observable<number> {
        return this.http.get<number>('order/count');
    }
}
