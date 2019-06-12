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
            this.load = false;
            this.errorsShow(err);
        });
    }

    googleSignIn() {
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
                this.snackBar.open('Dirección de correo electrónico  y/o contraseña incorrecta.', '', {
                    duration: 5000,
                    panelClass: ['bg-danger', 'text-white']
                });
                break;
            case 'auth/wrong-password':
                this.snackBar.open('Dirección de correo electrónico  y/o contraseña incorrecta.', '', {
                    duration: 5000,
                    panelClass: ['bg-danger', 'text-white']
                });
                break;
            case 'auth/user-disabled':
                this.snackBar.open('Su cuenta ha sido suspendida. Póngase en contacto con el administrador.', '', {
                    duration: 5000,
                    panelClass: ['bg-danger', 'text-white']
                });
                break;
            default:
                this.snackBar.open('Usuario no encontrado.', '', {
                    duration: 5000,
                    panelClass: ['bg-danger', 'text-white']
                });
                break;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
