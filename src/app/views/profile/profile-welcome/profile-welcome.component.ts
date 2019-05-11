import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth/auth.service';

@Component({
    selector: 'app-profile-welcome',
    templateUrl: './profile-welcome.component.html',
    styleUrls: ['./profile-welcome.component.sass']
})
export class ProfileWelcomeComponent implements OnInit {

    constructor(public auth: AuthService) { }

    ngOnInit() {}

}
