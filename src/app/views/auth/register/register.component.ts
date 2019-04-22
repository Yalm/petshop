import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { EqualsValidator } from 'src/app/validators/equals.validator';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

    public name = new FormControl('', [Validators.required, Validators.minLength(3)]);
    public email = new FormControl('', [Validators.required, Validators.email]);
    public password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    public password_confirmation = new FormControl('', [Validators.required, EqualsValidator(this.password)]);
    public terms = new FormControl('', [Validators.requiredTrue]);
    public registerForm: FormGroup;

    public sendEmailVerify: boolean;
    private returnUrl: string;

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit() {
        this.createForm();
        this.returnUrl = localStorage.getItem('returnUrl') || '/';
    }

    register(): void {
        if (this.registerForm.valid) {
            this.auth.doRegister(this.email.value, this.password.value, this.name.value).then((data) => {
                this.sendEmailVerify = true;
            }).catch(err => {
                if (err.code == 'auth/email-already-in-use') {
                    this.registerForm.controls['email'].setErrors({ 'unique': true });
                }
            });
        }
    }

    googleSignIn(): void {
        this.auth.googleSignIn().then(() => {
            this.router.navigateByUrl(this.returnUrl);
            localStorage.removeItem('returnUrl');
        }).catch(err => {
            if (err.code != "auth/popup-closed-by-user") {
                console.log(err);
            }
        });
    }

    getErrorMessage(): string {
        return this.name.hasError('required') ? 'Debes introducir un valor' :
            this.name.hasError('minlength') ? 'Nombres debe contener al menos 3 caracteres' :
                this.email.hasError('required') ? 'Debes introducir un valor' :
                    this.email.hasError('email') ? 'No es un correo electrónico válido' :
                        this.email.hasError('unique') ? 'El correo electrónico ya ha sido registrado.' :
                            this.password.hasError('required') ? 'Debes introducir un valor' :
                                this.password.hasError('minlength') ? 'Contraseña debe contener al menos 6 caracteres' :
                                    this.password_confirmation.hasError('required') ? 'Debes introducir un valor' :
                                        this.password_confirmation.hasError('equals') ? 'Las contraseñas no coinciden' : '';
    }

    validInput(fromControl: string): boolean {
        return this.registerForm.get(fromControl).invalid &&
            this.registerForm.get(fromControl).touched;
    }

    private createForm(): void {
        this.registerForm = new FormGroup({
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            terms: this.terms
        });
    }

}
