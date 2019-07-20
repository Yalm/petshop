import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/views/auth/models/customer';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(private http: HttpClient) { }

    public show(id: number): Observable<Customer> {
        return this.http.get<Customer>(`customers/${id}`);
    }

    public count(): Observable<number> {
        return this.http.get<number>('customers/count');
    }

    public update(data: Customer): Observable<Customer> {
        return this.http.put<Customer>(`customers/${data.id}`, data);
    }
}
