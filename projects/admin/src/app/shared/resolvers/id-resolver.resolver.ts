import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class IdResolver implements Resolve<any> {
    constructor(private http: HttpClient) { }

    resolve<T = any>(route: ActivatedRouteSnapshot): Observable<T> {
        return this.http.get<T>(`${route.data.path}/${route.paramMap.get('id')}`);
    }
}
