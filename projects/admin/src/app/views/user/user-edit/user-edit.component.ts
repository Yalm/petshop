import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../../services/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit {

    form: FormGroup;

    constructor(private route: ActivatedRoute,
                private snackBar: MatSnackBar,
                private userService: UserService) { }

    ngOnInit(): void {
        const user = this.route.snapshot.data.user;
        this.form = new FormGroup({
            id: new FormControl(user.id, Validators.required),
            name: new FormControl(user.name, [Validators.required, Validators.maxLength(191), Validators.minLength(5)]),
            surnames: new FormControl(user.surnames, [Validators.required, Validators.maxLength(191), Validators.minLength(5)]),
            email: new FormControl(user.email, [Validators.required, Validators.email]),
            avatar: new FormControl(user.avatar),
            password: new FormControl(null, [Validators.maxLength(191), Validators.minLength(6)])
        });
    }

    update(): void {
        this.userService.update(this.form.value).subscribe(() => {
            this.snackBar.open('Usuario actualizado.', 'OK', { duration: 5000 });
        }, (error: HttpErrorResponse) => {
            if (error.status === 422) {
                this.form.get('email').setErrors({ unique: true });
            }
        });
    }
}
