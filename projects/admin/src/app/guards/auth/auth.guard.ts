import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private auth: AuthService, private router: Router) { }
    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.auth.user$.pipe(
            map(user => user && user.claims.roles.admin ? true : false),
            tap(isAdmin => {
                if (!isAdmin) {
                    console.error('Access denied - Admins only')
                }
            })
        );
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.auth.user$.pipe(
            map(user => {
                if (!user) {
                    return this.returnUrlTreeLogin(state);
                }

                if (!user.claims.roles) {
                    return this.returnUrlTreeLogin(state);
                }
                if (user.claims.roles.admin || user.claims.roles.editor) {
                    return true;
                } else {
                    return this.returnUrlTreeLogin(state);
                }
            })
        );
    }

    private returnUrlTreeLogin(state: RouterStateSnapshot): UrlTree {
        return this.router.createUrlTree(['/login'], {
            queryParams: {
                return: state.url
            }
        });
    }
}
