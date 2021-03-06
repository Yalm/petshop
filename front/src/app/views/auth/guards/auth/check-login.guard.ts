import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take,map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
    constructor(private auth:AuthService,private router:Router){}
    canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean
    {
        return !this.auth.isAuthenticated();
    }
}
