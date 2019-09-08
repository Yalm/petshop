import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { State } from '../../models/state.model';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    constructor(private http: HttpClient) { }

    index(): Observable<State[]> {
        return this.http.get<State[]>('states');
    }
}
