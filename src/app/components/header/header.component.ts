import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthService } from 'src/app/views/auth/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { Category } from 'functions/src/models/Category.model';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

    public home: boolean;
    public position: boolean;
    public search: boolean;
    categories$: Observable<Category[]>;

    constructor(private router: Router,
        public auth: AuthService,
        private categoryService: CategoryService,
        public shoppingCartService: ShoppingCartService) { }

    ngOnInit() {
        this.router.events.subscribe(
            (event: any) => {
                if (event instanceof RoutesRecognized) {
                    this.home = event.state.root.firstChild.data.headerDisabled ? true : false;
                    this.position = event.state.root.firstChild.data.relative ? true : false;
                }
            }
        );
        this.categories$ = this.categoryService.index();
    }

}
