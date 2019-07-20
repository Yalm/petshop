import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/User.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

    @Input() darkTheme: boolean;
    @Output() activeDark = new EventEmitter();
    user: User;

    constructor(public auth: AuthService,
        private router: Router) { }

    ngOnInit() {
        this.user = this.auth.getPayload();
    }

    logout(): void {
        this.auth.logout().subscribe(() => {
            this.router.navigateByUrl('/login');
        });
    }
}
