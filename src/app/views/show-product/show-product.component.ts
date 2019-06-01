import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/Product.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-show-product',
    templateUrl: './show-product.component.html',
    styleUrls: ['./show-product.component.sass']
})
export class ShowProductComponent implements OnInit {

    public product: Product;
    constructor(private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(param => {
            if (param.url) {
                this.productService.show(param.url).subscribe(response => {
                    if (response) {
                        this.product = response;
                    } else {
                        this.router.navigateByUrl('404', { skipLocationChange: true });
                    }
                });
            }
        });
    }

}
