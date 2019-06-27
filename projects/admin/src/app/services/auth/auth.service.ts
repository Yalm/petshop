import { Injectable } from '@angular/core';
import { AuthService as ng2Auth, SharedService, LocalService, OauthService } from 'ng2-ui-auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenResponse } from 'src/app/models/TokenResponse.model';

@Injectable({
    providedIn: 'root'
})

export class AuthService extends ng2Auth {

    constructor(shared: SharedService, local: LocalService, oauth: OauthService, private http: HttpClient) {
        super(shared, local, oauth);
    }

    sendPasswordResetEmail(email: string): Observable<string> {
        return this.http.post<string>('auth/auser/password/email', { email });
    }

    reset(data: object): Observable<TokenResponse> {
        return this.http.post<TokenResponse>('auth/auser/password/reset', data);
    }
}

