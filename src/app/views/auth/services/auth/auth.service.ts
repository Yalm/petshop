import { Injectable } from '@angular/core';
import { AuthService as ng2Auth, SharedService, LocalService, OauthService } from 'ng2-ui-auth';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { TokenResponse } from 'src/app/models/TokenResponse.model';
import { Customer } from '../../models/customer';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AuthService extends ng2Auth {

    public customer$: Observable<Customer>;
    private authState = new BehaviorSubject<boolean>(this.isAuthenticated());

    constructor(shared: SharedService,
        local: LocalService,
        oauth: OauthService,
        private http: HttpClient) {
        super(shared, local, oauth);
        this.customer$ = this.authState.asObservable().pipe(
            switchMap(customer => {
                if (customer) {
                    return of<Customer>(this.getPayload());
                } else {
                    return of(null);
                }
            })
        );
    }

    sendPasswordResetEmail(email: string): Observable<string> {
        return this.http.post<string>('auth/customer/password/email', { email });
    }

    reset(data: object): Observable<TokenResponse> {
        return this.http.post<TokenResponse>('auth/customer/password/reset', data)
            .pipe(
                tap(() => this.authState.next(true))
            );
    }

    googleSignIn(): Observable<TokenResponse> {
        return this.authenticate<TokenResponse>('google')
            .pipe(
                tap(() => this.authState.next(true))
            );
    }

    defaultSignIn(loginData: { email: string; password: string }): Observable<TokenResponse> {
        return this.login<TokenResponse>(loginData, 'auth/customer/login')
            .pipe(
                tap(() => this.authState.next(true))
            );
    }

    register(registerData: { name: string; email: string; password: string; password_confirmation: string }): Observable<void> {
        return this.signup(registerData, 'auth/customer/register');
    }

    signOut(): Observable<void> {
        return this.http.get<void>('auth/customer/logout')
            .pipe(
                tap(() => this.authState.next(false)),
                tap(() => this.removeToken())
            );
    }

    me(): Observable<Customer> {
        return this.http.get<Customer>('auth/customer/me');
    }

    sendEmailVerification(data: { email: string }): Observable<boolean> {
        return this.http.post<boolean>('auth/customer/send-email-verify', data);
    }

    verifyEmail(token: string): Observable<boolean> {
        return this.http.get<boolean>('auth/customer/verify', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
