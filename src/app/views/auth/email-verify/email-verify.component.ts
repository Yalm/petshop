import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-email-verify',
    templateUrl: './email-verify.component.html'
})
export class EmailVerifyComponent implements OnInit {
    form: FormGroup;

    constructor(
        private auth: AuthService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
        });
    }

    sendEmail() {
        this.auth.sendEmailVerification(this.form.value).subscribe(() => {
            this.form.reset();
            this.snackBar.open('¡Te hemos enviado por correo el enlace de las instrucciones de confirmación.', 'OK', { duration: 4000 });
        }, (err: HttpErrorResponse) => {
            if (err.status && err.status === 422) {
                this.form.get('email').setErrors({ exists: true });
            }
        });
    }
}
