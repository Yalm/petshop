import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    public email = new FormControl('', [Validators.required, Validators.email]);
    public password = new FormControl('', [Validators.required]);
    public loginForm: FormGroup;
    public warEmailVerifiedEmail: boolean;
    private returnUrl: string;

    constructor(public auth: AuthService,
        private router: Router) { }

    ngOnInit() {
        this.createForm();
        this.returnUrl = localStorage.getItem('returnUrl') || '/';
    }

    login():void {
        this.auth.defaultSignIn(this.email.value, this.password.value).then(data => {
            this.router.navigateByUrl(this.returnUrl);
            localStorage.removeItem('returnUrl');
        }).catch(err => {
            if (err.code == 'auth/user-not-found') {
                this.loginForm.controls['email'].setErrors({ 'not-found': true });
            } else if (err.code == 'auth/wrong-password') {
                this.loginForm.controls['email'].setErrors({ 'not-found': true });
            } else if (err == 'email no verifed') {
                this.warEmailVerifiedEmail = true;
            }
        });
    }

    public googleSignIn(): void {
        this.auth.googleSignIn().then(() => {
            this.router.navigateByUrl(this.returnUrl);
            localStorage.removeItem('returnUrl');
        }).catch(err => {
            if (err.code != "auth/popup-closed-by-user") {
                console.log(err);
            }
        });
    }

    getErrorMessage() {
        return this.password.hasError('required') ? 'Debes introducir un valor' :
            this.email.hasError('required') ? 'Debes introducir un valor' :
            this.email.hasError('not-found') ? 'Dirección de correo electrónico  y/o contraseña incorrecta.' :
                this.email.hasError('email') ? 'No es un correo electrónico válido' : '';
    }

    private createForm() {
        this.loginForm = new FormGroup({
            email: this.email,
            password: this.password
        });
    }

}
