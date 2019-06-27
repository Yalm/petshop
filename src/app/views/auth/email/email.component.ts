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
    public form: FormGroup;

    constructor(private auth: AuthService) { }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
        });
    }

    sendEmail() {
        this.auth.sendPasswordResetEmail(this.form.value.email).subscribe(response => {
            console.log(response)
        }, response => {
            this.errorsShow(response.error);
        });
    }

    private errorsShow(err: any): void {
        if (!err) {
            return;
        }

        if (err.email) {
            this.form.get('email').setErrors({ 'exists': true });
        }
    }
}
