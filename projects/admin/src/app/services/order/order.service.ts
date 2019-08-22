import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/models/Order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) { }

    index(): Observable<Order[]> {
        return this.http.get<Order[]>('orders');
    }

    show(id: number): Observable<Order> {
        return this.http.get<Order>(`orders/${id}`);
    }

    update(data: Order): Observable<Order> {
        return this.http.put<Order>(`orders/${data.id}`, data);
    }

    count(): Observable<number> {
        return this.http.get<number>('order/count');
    }
}
