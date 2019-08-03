import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../views/auth/services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class VerifyResolver implements Resolve<any> {
    constructor(private auth: AuthService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.auth.verifyEmail(route.paramMap.get('token')).pipe(
            finalize(() =>
                this.router.createUrlTree(['/login'], { state: { verify: true } })
            ),
            catchError(() => {
                this.router.navigate(['/login'], { state: { verify: false } })
                return of();
            })
        );
    }
}
