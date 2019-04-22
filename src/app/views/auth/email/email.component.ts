import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-email',
    templateUrl: './email.component.html',
    styleUrls: ['./email.component.sass']
})
export class EmailComponent implements OnInit {

    public email = new FormControl('', [Validators.required, Validators.email]);
    public sendEmailForm: FormGroup;

    constructor(private auth: AuthService) { }

    ngOnInit() {
        this.createForm();
    }

    sendEmail() {
        this.auth.sendPasswordResetEmail(this.email.value).then( data =>
            console.log('success')
        ).catch(err => {
            if(err.code == 'auth/user-not-found') {
                this.email.setErrors({ 'not-found': true });
            }
        });
    }

    getErrorMessage() {
        return this.email.hasError('required') ? 'Debes introducir un valor' :
        this.email.hasError('not-found') ? 'No podemos encontrar ningún usuario con ese correo electrónico.' :
            this.email.hasError('email') ? 'No es un correo electrónico válido' : '';
    }

    private createForm() {
        this.sendEmailForm = new FormGroup({
            email: this.email
        });
    }
}
