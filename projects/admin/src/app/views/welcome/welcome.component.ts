import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

    constructor(private auth: AuthService) { }

    ngOnInit() {
    }
    salir() {
        this.auth.signOut();
    }
}
