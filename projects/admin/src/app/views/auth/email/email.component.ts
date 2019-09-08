import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.sass']
})
export class EmailComponent implements OnInit {

    form: FormGroup;

    constructor(
        private auth: AuthService,
        private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email])
        });
    }

    sendEmail() {
        this.auth.sendPasswordResetEmail(this.form.value.email).subscribe(() => {
            this.snackBar.open('¡Te hemos enviado por correo el enlace para restablecer tu contraseña!', 'OK', { duration: 5000 });
            this.form.reset();
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
