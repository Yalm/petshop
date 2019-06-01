import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthService } from 'src/app/views/auth/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public home: boolean;
    public position: boolean;
    public search: boolean;

    private subscriptionRouter: Subscription;

    constructor(private router: Router,
        public auth: AuthService,
        public shoppingCartService: ShoppingCartService) { }

    ngOnInit() {

        this.subscriptionRouter = this.router.events.subscribe(
            (event: any) => {
                if (event instanceof RoutesRecognized) {
                    this.home = event.state.root.firstChild.data.headerDisabled ? true : false;
                    this.position = event.state.root.firstChild.data.relative ? true : false;
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

    ngOnDestroy() {
        this.subscriptionRouter.unsubscribe();
    }

}
