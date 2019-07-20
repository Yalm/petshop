import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../../services/user/user.service';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit {

    form: FormGroup;
    loading: boolean;

    constructor(private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private userService: UserService) { }

    ngOnInit() {
        this.route.params.pipe(
            switchMap(params => this.userService.show(params.id))
        ).subscribe(user => {
            this.form = new FormGroup({
                id: new FormControl(user.id, Validators.required),
                name: new FormControl(user.name, [Validators.required, Validators.maxLength(191), Validators.minLength(5)]),
                surnames: new FormControl(user.surnames, [Validators.required, Validators.maxLength(191), Validators.minLength(5)]),
                email: new FormControl(user.email, [Validators.required, Validators.email]),
                avatar: new FormControl(user.avatar),
                password: new FormControl(null, [Validators.maxLength(191), Validators.minLength(6)])
            });
        });
    }

    update() {
        this.loading = true;
        this.userService.update(this.form.value).subscribe((data) => {
            this.loading = false;
            this.snackBar.open('Usuario actualizado.', 'OK');
            this.form.reset();
        });
    }

}
