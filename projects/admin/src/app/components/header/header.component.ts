import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

    constructor(public auth: AuthService) { }

    ngOnInit() {
        // this.auth.user$.subscribe(data => {
        //     console.log(data);
        // })
    }

}
