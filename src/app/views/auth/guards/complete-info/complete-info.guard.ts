import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CompleteInfoGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.auth.complete().pipe(
            map(response => {
                if (!response) {
                    return this.router.createUrlTree(['/complete-info'], {
                        queryParams: {
                            return: state.url
                        }
                    });
                }
                return true;
            })
        );
    }
}
