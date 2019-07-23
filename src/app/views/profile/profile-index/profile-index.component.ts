import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-index',
    templateUrl: './profile-index.component.html',
    styleUrls: ['./profile-index.component.sass']
})
export class ProfileIndexComponent implements OnInit {

    constructor(public auth: AuthService, private router: Router) { }

    ngOnInit() { }

    logout(): void {
        this.auth.signOut().subscribe(() => {
            this.router.navigateByUrl('/');
        });
    }
}
