import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/views/auth/services/auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

    public home: boolean;
    public search: boolean;

    constructor(private router: Router,public auth: AuthService) { }

    ngOnInit() {

        this.router.events.subscribe(
            (event: any) => {
                if (event instanceof NavigationEnd) {
                    this.home = this.router.url == '/' ? true : false;
                }
            }
        );

        const NAV = document.getElementById('nav_petshop').classList;
        window.onscroll = () => {
            const SCROLL = document.scrollingElement.scrollTop;
            if (SCROLL > 500) {
                NAV.add('fixed-top');
                NAV.add('scroll-header');
            } else {
                NAV.remove('fixed-top');
                NAV.remove('scroll-header');
            }
        }
    }

}
