import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    private returnUrl: string;
    verify: { isVerify: boolean };

    constructor(
        private auth: AuthService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => this.returnUrl = params.return || '/profile');
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        });

        if (this.route.snapshot.data.hasOwnProperty('verify')) {
            this.verify = { isVerify: this.route.snapshot.data.verify };
        }
    }

    login(): void {
        this.auth.defaultSignIn(this.form.value).subscribe(response => {
            this.auth.setToken(response.access_token);
            this.router.navigateByUrl(this.returnUrl);
        }, response => {
            this.errorsShow(response.error);
        });
    }

    googleSignIn(): void {
        this.auth.googleSignIn()
            .subscribe(response => {
                this.auth.setToken(response.access_token);
                this.router.navigateByUrl(this.returnUrl);
            }, response => {
                this.errorsShow(response.error);
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
            case 'auth/user-not-verified-email':
                this.snackBar.open('Por favor verifique su correo.', '', {
                    duration: 5000,
                    panelClass: ['bg-danger', 'text-white']
                });
                break;
            default:
                break;
        }
    }
}
