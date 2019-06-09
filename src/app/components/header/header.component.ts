import { Component, OnInit, OnDestroy, Inject, HostListener } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthService } from 'src/app/views/auth/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public home: boolean;
    public position: boolean;
    public search: boolean;
    classFixed: string;

    private subscriptionRouter: Subscription;

    constructor(private router: Router,
        @Inject(DOCUMENT) document,
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
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll(e) {
        if (window.pageYOffset > 400) {
            this.classFixed = 'scroll-header fixed-top';
        } else {
            this.classFixed = '';
        }
    }

    ngOnDestroy() {
        this.subscriptionRouter.unsubscribe();
    }

}
