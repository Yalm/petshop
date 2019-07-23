import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { ColorService } from 'src/app/services/color/color.service';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/Color.model';
import { Category } from 'src/app/models/Category.model';
import { MatSnackBar } from '@angular/material';
import { ProductService } from '../../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.sass']
})
export class ProductEditComponent implements OnInit {
    form: FormGroup;
    categories: Observable<Category[]>;
    colors: Observable<Color[]>;

    constructor(public categoryService: CategoryService,
        public colorService: ColorService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private productService: ProductService) { }

    ngOnInit() {
        this.route.params.pipe(
            switchMap(params => this.productService.show(params.id))
        ).subscribe(product => {
            this.form = new FormGroup({
                id: new FormControl(product.id, [Validators.required]),
                name: new FormControl(product.name, [Validators.required, Validators.maxLength(250), Validators.minLength(5)]),
                price: new FormControl(product.price, [Validators.required, Validators.min(5)]),
                stock: new FormControl(product.stock, [Validators.required, Validators.min(0)]),
                short_description: new FormControl(product.short_description, [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
                category_id: new FormControl(product['category_id'], Validators.required),
                cover: new FormControl(product.cover, Validators.required),
                description: new FormControl(product.description, Validators.minLength(10)),
                color_id: new FormControl(product['color_id'])
            });
        });
        this.colors = this.colorService.index();
        this.categories = this.categoryService.index();
    }

    edit() {
        this.productService.update(this.form.value).subscribe(() => {
            this.snackBar.open('Producto editado.', 'OK');
        });
    }

}
