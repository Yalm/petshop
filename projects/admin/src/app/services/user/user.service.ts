import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/app/views/auth/models/customer';
import { User } from '../../models/User.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    public index(id: number): Observable<User[]> {
        return this.http.get<User[]>('users');
    }

    public show(id: number): Observable<Customer> {
        return this.http.get<Customer>(`users/${id}`);
    }

    public store(data: Customer): Observable<Customer> {
        return this.http.post<Customer>('users', data);
    }

    public update(data: Customer): Observable<Customer> {
        return this.http.put<Customer>(`users/${data.id}`, data);
    }
}
