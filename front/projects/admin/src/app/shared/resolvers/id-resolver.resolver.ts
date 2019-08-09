import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class IdResolver implements Resolve<any> {
    constructor(private http: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
        return this.http.get<any[]>(`${route.data.path}/${route.paramMap.get('id')}`);
    }
}
