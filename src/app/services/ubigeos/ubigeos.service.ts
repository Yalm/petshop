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

    department(id: string): Observable<string> {
        return this.http.get<any[]>('assets/json/departamentos.json')
            .pipe(
                map(response => response.find(x => x.id_ubigeo === id).nombre_ubigeo)
            );
    }

    provinces(id: string): Observable<any[]> {
        return this.http.get<any[]>('assets/json/provincias.json').pipe(
            map(response => {
                const provinces = Object.keys(response).find(element => element === id);
                return response[provinces];
            })
        );
    }

    province(parent: string, id: string): Observable<string> {
        return this.http.get<any[]>('assets/json/provincias.json').pipe(
            map(response => {
                const provinces = Object.keys(response).find(element => element === parent);
                return response[provinces].find(x => x.id_ubigeo === id).nombre_ubigeo;
            })
        );
    }
}
