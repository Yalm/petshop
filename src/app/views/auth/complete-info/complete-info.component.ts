import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-complete-info',
    templateUrl: './complete-info.component.html',
    styleUrls: ['./complete-info.component.sass']
})
export class CompleteInfoComponent implements OnInit {

    form: FormGroup;
    private returnUrl: string;

    constructor(
        private snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private auth: AuthService
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => this.returnUrl = params.return || '/profile');
        this.auth.me().subscribe(customer => {
            this.form = new FormGroup({
                id: new FormControl(customer.id, Validators.required),
                name: new FormControl(customer.name, Validators.required),
                surnames: new FormControl(customer.surnames, Validators.required),
                phone: new FormControl(customer.phone, [
                    Validators.required,
                    Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')
                ])
            });
        });
    }

    edit(): void {
        this.userService.edit(this.form.value).subscribe(() => {
            this.snackBar.open('Su información ha sido actualizado', 'Ok', { duration: 5000 });
            this.router.navigateByUrl(this.returnUrl);
        });
    }
}
