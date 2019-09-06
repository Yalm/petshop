import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

    form: FormGroup;
    searchActive: boolean;
    categories$: Observable<Category[]>;

    constructor(
        private router: Router,
        public auth: AuthService,
        private categoryService: CategoryService,
        public shoppingCartService: ShoppingCartService
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            search: new FormControl(null, [Validators.required, Validators.minLength(3)])
        });

        this.categories$ = this.categoryService.index();
    }

    search(): void {
        if (this.form.valid) {
            const search = this.form.value.search.trim().toLowerCase();
            this.searchActive = false;
            this.router.navigate(['/shop'], { queryParams: { search }, queryParamsHandling: 'merge' });
        }
    }
}
