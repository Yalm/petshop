import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-show-product',
    templateUrl: './show-product.component.html',
    styleUrls: ['./show-product.component.sass']
})
export class ShowProductComponent implements OnInit {

    product$: Observable<Product>;
    constructor(private productService: ProductService,
                private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.product$ = this.route.params
            .pipe(
                switchMap(params => this.productService.show(params.url)),
                catchError(() => {
                    this.router.navigateByUrl('404', { skipLocationChange: true });
                    return of(null);
                })
            );
    }
}
