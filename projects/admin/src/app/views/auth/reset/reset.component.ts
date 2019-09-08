import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EqualsValidator } from 'src/app/validators/equals.validator';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.sass']
})
export class ResetComponent implements OnInit {
    form: FormGroup;

    constructor(
        private auth: AuthService,
        private snackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.form = new FormGroup({
            token: new FormControl(this.route.snapshot.queryParams.token, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            password_confirmation: new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
        this.form.get('password_confirmation').setValidators(EqualsValidator(this.form.get('password')));
    }

    reset() {
        this.auth.reset(this.form.value).subscribe(response => {
            this.auth.setToken(response.access_token);
            this.router.navigateByUrl('/');
        }, response => {
            this.errorsShow(response.error);
        });
    }

    private errorsShow(err: any): void {
        if (err.email) {
            this.form.get('email').setErrors({ exists: true });
            return;
        }
        switch (err.error) {
            case 'passwords.token':
                this.snackBar.open('El token de recuperación de contraseña es inválido.', '', {
                    duration: 5000,
                    panelClass: ['bg-danger', 'text-white']
                });
                break;
            case 'passwords.password':
                this.snackBar.open('Las contraseñas deben coincidir y contener al menos 6 caracteres.', '', {
                    duration: 5000,
                    panelClass: ['bg-danger', 'text-white']
                });
                break;
            default:
                break;
        }
    }
}
