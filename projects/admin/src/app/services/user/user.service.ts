import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User.model';
import { CreateFormData } from '../../shared/class/CreateFromData';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    public index(): Observable<User[]> {
        return this.http.get<User[]>('users');
    }

    public show(id: number): Observable<User> {
        return this.http.get<User>(`users/${id}`);
    }

    public store(data: User): Observable<User> {
        return this.http.post<User>('users', CreateFormData({ data }));
    }

    public update(data: User): Observable<User> {
        return this.http.post<User>(`users/${data.id}`, CreateFormData({ data, update: true }));
    }

    public password(data: { current_password: string, password: string, password_confirmation: string }): Observable<void> {
        return this.http.put<void>('user/password', data);
    }
}
