import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap, map } from 'rxjs/operators';
import { Category } from 'src/app/models/Category.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { Color } from 'src/app/models/Color.model';
import { ColorService } from 'src/app/services/color/color.service';
import { PageEvent } from '@angular/material';
import { Pagination } from 'src/app/models/Pagination.model';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.sass']
})
export class ShopComponent implements OnInit {

    categories$: Observable<Category[]>;
    colors$: Observable<Color[]>;
    filters: any[];
    pagination$: Observable<Pagination<Product>>;

    constructor(private productService: ProductService,
        private categoryService: CategoryService,
        private colorService: ColorService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.pagination$ = this.route.queryParams.pipe(
            tap(queryParams => {
                this.filters = Object.keys(queryParams)
                    .filter(key => key == 'category' || key == 'color' || key == 'search')
                    .map(key => {
                        return { key, value: queryParams[key] }
                    });
            }),
            switchMap(queryParams => this.productService.index(queryParams))
        );
        this.categories$ = this.categoryService.index(true);
        this.colors$ = this.colorService.index();
    }

    setFilter(name: string, value: number) {
        this.router.navigate(['/shop'], { queryParams: { [name]: value }, queryParamsHandling: 'merge' });
    }

    removeFilter(filterIndex: number) {
        this.filters.splice(filterIndex, 1);
        const queryParams = this.filters.reduce((data, filter) => {
            data[filter.key] = filter.value;
            return data;
        }, {});
        this.router.navigate(['/shop'], { queryParams });
    }

    isSelected(name: string, value: number) {
        let selected = this.filters.find(x => x.key == name && x.value == value) ? true : false;
        return selected;
    }

    page(event: PageEvent) {
        this.router.navigate(['/shop'], { queryParams: { results: event.pageSize, page: event.pageIndex + 1 }, queryParamsHandling: 'merge' });
    }
}
