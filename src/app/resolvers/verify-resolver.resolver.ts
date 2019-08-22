import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../views/auth/services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class VerifyResolver implements Resolve<any> {
    constructor(private auth: AuthService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.auth.verifyEmail(route.paramMap.get('token')).pipe(
            catchError(() => of(false))
        );
    }
}
