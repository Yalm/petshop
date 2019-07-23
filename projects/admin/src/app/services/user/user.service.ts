import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    public index(id: number): Observable<User[]> {
        return this.http.get<User[]>('users');
    }

    public show(id: number): Observable<User> {
        return this.http.get<User>(`users/${id}`);
    }

    public store(data: User): Observable<User> {
        const form_data = new FormData();
        for (const key in data) {
            form_data.append(key, data[key]);
        }
        return this.http.post<User>('users', form_data);
    }

    public update(data: User): Observable<User> {
        const form_data = new FormData();
        for (const key in data) {
            if(data[key]) {
                form_data.append(key, data[key]);
            }
        }
        form_data.delete('id');
        form_data.append('_method', 'PUT');
        return this.http.post<User>(`users/${data.id}`, form_data);
    }

    public password(data: { current_password: string, password: string, password_confirmation: string }): Observable<void> {
        return this.http.put<void>('user/password', data);
    }
}
