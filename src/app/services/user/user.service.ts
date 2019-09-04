import { Injectable } from '@angular/core';
import { Customer } from 'src/app/views/auth/models/customer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    edit(data: Customer): Observable<Customer> {
        return this.http.put<Customer>(`customers/${data.id}`, data);
    }
}
