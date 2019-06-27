import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/Order.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ShoppingCart } from 'src/app/models/ShoppingCart.model';
import { Pagination } from 'src/app/models/Pagination.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient) {}

    public index(): Observable<Order[]> {
        return this.http.get<Pagination<Order>>('orders')
            .pipe(
                map(response => response.data)
            );
    }

    public show(id: string): Observable<Order> {
        return this.http.get<Order>(`orders/${id}`)
            .pipe(
                map(item => {
                    item.products.map(x => {
                        x.quantity = x['pivot']['quantity'];
                        return x;
                    })
                    return item;
                })
            );
    }

    public store(culqi_token: string, plus_info?: string): Observable<Order> {
        const cart: ShoppingCart = JSON.parse(localStorage.getItem('myCart'));
        return this.http.post<Order>(`orders`, { culqi_token, items: cart.items, plus_info });
    }
}
