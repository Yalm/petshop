import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit,OnDestroy {

    public email = new FormControl('', [Validators.required, Validators.email]);
    public password = new FormControl('', [Validators.required]);
    public loginForm: FormGroup;
    private returnUrl: string;
    public messageBannedUser: boolean;

    private subscription: Subscription;

    constructor(public auth: AuthService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.createForm();
        this.subscription = this.route.queryParams.subscribe(params => this.returnUrl = params['return'] || '/');
    }

    login(): void {
        this.auth.defaultSignIn(this.email.value, this.password.value).then(data => {
            this.router.navigateByUrl(this.returnUrl);
        }).catch(err => {
            this.errorsShow(err);
        });
    }

    googleSignIn(): void {
        this.auth.googleSignIn().then(() => {
            this.router.navigateByUrl(this.returnUrl);
        }).catch(err => {
            if (err.code != "auth/popup-closed-by-user") {
                this.errorsShow(err);
            }
        });
    }

    private errorsShow(err: any): void {
        switch (err.code) {
            case 'auth/user-not-found':
                this.loginForm.controls['email'].setErrors({ 'not-found': true });
                break;
            case 'auth/wrong-password':
                this.loginForm.controls['email'].setErrors({ 'not-found': true });
                break;
            case 'auth/user-disabled':
                this.messageBannedUser = true;
                break;
            default:
                break;
        }
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
