import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Category } from 'src/app/models/Category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { Color } from 'src/app/models/Color.model';
import { ColorService } from 'src/app/services/color/color.service';
import { PageEvent } from '@angular/material';
import { Pagination } from 'src/app/models/Pagination.model';
import { PetParams } from 'src/app/models/Params.model';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.sass']
})
export class ShopComponent implements OnInit {

    categories$: Observable<Category[]>;
    colors$: Observable<Color[]>;
    filters$: Observable<PetParams>;
    pagination$: Observable<Pagination<Product>>;

    constructor(private productService: ProductService,
                private categoryService: CategoryService,
                private colorService: ColorService,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.pagination$ = this.route.queryParams.pipe(
            switchMap(queryParams => this.productService.index(queryParams))
        );
        this.categories$ = this.categoryService.index({ onlyChilds: true });
        this.colors$ = this.colorService.index();

        this.filters$ = this.route.queryParams.pipe(
            map(params => new PetParams({ params, only: ['category', 'color', 'search'] }))
        );
    }

    setFilter(name: string, value: number) {
        this.router.navigate(['/shop'], { queryParams: { [name]: value }, queryParamsHandling: 'merge' });
    }

    removeFilter(key: string, params: PetParams) {
        const queryParams = params.delete(key);
        this.router.navigate(['/shop'], { queryParams });
    }

    page(event: PageEvent) {
        this.router.navigate(['/shop'], {
            queryParams: { results: event.pageSize, page: event.pageIndex + 1 },
            queryParamsHandling: 'merge'
        });
    }
}
