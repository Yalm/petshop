import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { EqualsValidator } from 'src/app/validators/equals.validator';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

    form: FormGroup;
    sendEmailVerify: boolean;
    private returnUrl: string;

    constructor(
        private auth: AuthService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private router: Router
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            password_confirmation: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            terms: new FormControl(null, [Validators.requiredTrue])
        });
        this.form.get('password_confirmation').setValidators(EqualsValidator(this.form.get('password')));
        this.route.queryParams.subscribe(params => this.returnUrl = params.return || '/profile');
    }

    register(): void {
        this.auth.register(this.form.value).subscribe(() => {
            this.sendEmailVerify = true;
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

        if (err.email) {
            this.form.get('email').setErrors({ unique: true });
        }

        if (err.code === 'auth/user-disable') {
            this.snackBar.open('Su cuenta ha sido suspendida. Póngase en contacto con el administrador.', '', {
                duration: 5000,
                panelClass: ['bg-danger', 'text-white']
            });
        }
    }
}
