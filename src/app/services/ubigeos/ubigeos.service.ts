import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UbigeosService {

    constructor(private http: HttpClient) { }

    departments(): Observable<any[]> {
        return this.http.get<any[]>('assets/json/departamentos.json');
    }

    provinces(id: string): Observable<any[]> {
        return this.http.get<any[]>('assets/json/provincias.json').pipe(
            map(response => {
                const provinces = Object.keys(response).find(element => element == id);
                return response[provinces];
            })
        );
    }

    districts(id: string): Observable<any[]> {
        return this.http.get<any[]>('assets/json/distritos.json').pipe(
            map(response => {
                const districts = Object.keys(response).find(element => element == id);
                return response[districts];
            })
        );
    }
}
