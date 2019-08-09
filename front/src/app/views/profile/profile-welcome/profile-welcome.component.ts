import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth/auth.service';
import { Customer } from '../../auth/models/customer';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-welcome',
    templateUrl: './profile-welcome.component.html',
    styleUrls: ['./profile-welcome.component.sass']
})
export class ProfileWelcomeComponent implements OnInit {
    customer: Customer;

    constructor(public auth: AuthService, private router: Router) { }

    ngOnInit() {
        this.customer = this.auth.getPayload();
    }

    logout(): void {
        this.auth.signOut().subscribe(() => {
            this.router.navigateByUrl('/');
        });
    }
}
