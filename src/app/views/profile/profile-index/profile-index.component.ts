import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth/auth.service';
import { Customer } from '../../auth/models/customer';

@Component({
    selector: 'app-profile-index',
    templateUrl: './profile-index.component.html',
    styleUrls: ['./profile-index.component.sass']
})
export class ProfileIndexComponent implements OnInit {

    public customer: Customer;
    constructor(public auth: AuthService) { }

    ngOnInit() {
        this.auth.customer$.subscribe(data => this.customer = data);
    }
}
