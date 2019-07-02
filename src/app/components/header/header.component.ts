import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthService } from 'src/app/views/auth/services/auth/auth.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/Category.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

    home: boolean;
    position: boolean;
    form: FormGroup;
    searchActive: boolean;
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

        this.form = new FormGroup({
            search: new FormControl(null, [Validators.required, Validators.minLength(3)]),
        });

        this.categories$ = this.categoryService.index();
    }

    search() {
        if (this.form.valid) {
            const search = this.form.value.search.trim().toLowerCase();
            this.router.navigate(['/shop'], { queryParams: { search: search }, queryParamsHandling: 'merge' });
        }
    }

}
