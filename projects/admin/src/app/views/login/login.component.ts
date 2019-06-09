import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {

    hide = true;
    load = false;
    form: FormGroup;
    returnUrl: string;
    messageBannedUser: boolean;
    private subscription: Subscription;

    constructor(public auth: AuthService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private router: Router) { }

    ngOnInit() {
        this.subscription = this.route.queryParams.subscribe(params => this.returnUrl = params['return'] || '/');
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, Validators.required),
        });
    }

    login() {
        this.load = true;
        this.auth.defaultSignIn(this.form.value).then(() => {
            this.load = false;
            this.router.navigateByUrl(this.returnUrl);
        }).catch(err => {
            this.errorsShow(err);
        });
    }

    googleSignIn() {
        this.auth.googleSignIn().then(() => {
            console.log('paso');
            this.router.navigateByUrl(this.returnUrl);
        }).catch(err => {
            console.log(err);
            if (err.code != "auth/popup-closed-by-user") {
                console.log(err);
                this.errorsShow(err);
            }
        });
    }

    private errorsShow(err: any): void {
        switch (err.code) {
            case 'auth/user-not-found':
                this.form.controls['email'].setErrors({ 'not-found': true });
                break;
            case 'auth/wrong-password':
                this.form.controls['email'].setErrors({ 'not-found': true });
                break;
            case 'auth/user-disabled':
                this.messageBannedUser = true;
                break;
            default:
                this.snackBar.open('Usuario no encontrado.', 'Ok');
                break;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
