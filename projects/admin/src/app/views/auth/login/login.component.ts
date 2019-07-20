import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    hide = true;
    load = false;
    form: FormGroup;
    returnUrl: string;

    constructor(public auth: AuthService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private router: Router) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => this.returnUrl = params['return'] || '/');
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, Validators.required),
        });
    }

    login() {
        this.load = true;
        this.auth.login(this.form.value).subscribe(response => {
            this.auth.setToken(response.access_token);
            this.router.navigateByUrl(this.returnUrl);
        }, response => {
            this.errorsShow(response.error);
            this.load = false;
        });
    }

    googleSignIn() {
        this.load = true;
        this.auth.authenticate('google')
            .subscribe(response => {
                this.auth.setToken(response.access_token);
                this.router.navigateByUrl(this.returnUrl);
            }, response => {
                this.errorsShow(response.error);
                this.load = false;
            });
    }

    private errorsShow(err: any): void {
        if (!err) {
            return;
        }
        switch (err.code) {
            case 'auth/user-not-found':
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
                break;
        }
    }
}
