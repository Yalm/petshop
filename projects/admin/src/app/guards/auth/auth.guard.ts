import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private auth: AuthService, private router: Router) { }
    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.auth.user$.pipe(
            take(1),
            map(user => user && user.roles.admin ? true : false),
            tap(isAdmin => {
                if (!isAdmin) {
                    console.error('Access denied - Admins only')
                }
            })
        );
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.auth.user$.pipe(
            take(1),
            map(user => {
                if (user && user.roles.admin || user && user.roles.editor) {
                    return true;
                } else {
                    return this.router.createUrlTree(['/login'], {
                        queryParams: {
                            return: state.url
                        }
                    });
                }
            })
        );
    }
}
