import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { CreateFormData } from '../../shared/class/CreateFormData';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    index(): Observable<User[]> {
        return this.http.get<User[]>('users');
    }

    show(id: number): Observable<User> {
        return this.http.get<User>(`users/${id}`);
    }

    store(data: User): Observable<User> {
        return this.http.post<User>('users', CreateFormData({ data }));
    }

    update(data: User): Observable<User> {
        return this.http.post<User>(`users/${data.id}`, CreateFormData({ data, update: true }));
    }

    password(data: { current_password: string, password: string, password_confirmation: string }): Observable<void> {
        return this.http.put<void>('user/password', data);
    }
}
