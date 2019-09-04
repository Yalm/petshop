import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html'
})
export class EmailComponent implements OnInit {
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
        this.auth.sendPasswordResetEmail(this.form.value.email).subscribe(() => {
            this.snackBar.open('¡Te hemos enviado por correo el enlace para restablecer tu contraseña!', 'OK', { duration: 5000 });
        }, response => {
            this.errorsShow(response.error);
        });
    }

    private errorsShow(err: any): void {
        if (!err) {
            return;
        }

        if (err.email) {
            this.form.get('email').setErrors({ exists: true });
        }
    }
}
