import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth/auth.service';

@Component({
    selector: 'app-profile-index',
    templateUrl: './profile-index.component.html',
    styleUrls: ['./profile-index.component.sass']
})
export class ProfileIndexComponent implements OnInit {

    constructor(public auth: AuthService) { }

    ngOnInit() { }
}
