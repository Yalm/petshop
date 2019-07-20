import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../../services/user/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.sass']
})
export class UserCreateComponent implements OnInit {

    form: FormGroup;
    loading: boolean;

    constructor(private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private userService: UserService) { }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.maxLength(191), Validators.minLength(5)]),
            surnames: new FormControl(null, [Validators.required, Validators.maxLength(191), Validators.minLength(5)]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            avatar: new FormControl(null),
            password: new FormControl(null, [Validators.required, Validators.maxLength(191), Validators.minLength(6)])
        });
    }

    store() {
        this.loading = true;
        this.userService.store(this.form.value).subscribe((data) => {
            this.loading = false;
            this.snackBar.open('Usuario creado.', 'OK');
            this.form.reset();
        });
    }
}
