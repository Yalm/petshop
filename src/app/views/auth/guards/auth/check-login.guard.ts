import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
    constructor(private auth: AuthService) { }
    canActivate(): boolean {
        return !this.auth.isAuthenticated();
    }
}
