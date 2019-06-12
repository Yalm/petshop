import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.sass']
})
export class ShopComponent implements OnInit {

    products$: Observable<Product[]>;

    constructor(private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.products$ = this.route.queryParams.pipe(
            switchMap(params => this.productService.index(params.category,params.color))
        );
    }

    add() {
        this.router.navigate(['/shop'], { queryParams: { color: 'blanco' }, queryParamsHandling: 'merge' });
    }

}
