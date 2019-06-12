import { Component, OnInit, OnDestroy, Inject, HostListener } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthService } from 'src/app/views/auth/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { Category } from 'functions/src/models/Category.model';
import { CategoryService } from 'src/app/services/category/category.service';

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
    categories$: Observable<Category[]>;

    private subscription: Subscription;

    constructor(private router: Router,
        @Inject(DOCUMENT) document,
        public auth: AuthService,
        private categoryService: CategoryService,
        public shoppingCartService: ShoppingCartService) { }

    ngOnInit() {

        this.subscription = this.router.events.subscribe(
            (event: any) => {
                if (event instanceof RoutesRecognized) {
                    this.home = event.state.root.firstChild.data.headerDisabled ? true : false;
                    this.position = event.state.root.firstChild.data.relative ? true : false;
                }
            }
        );
        this.categories$ = this.categoryService.index();
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
        this.subscription.unsubscribe();
    }

}
