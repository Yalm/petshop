import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { ColorService } from 'src/app/services/color/color.service';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/Color.model';
import { Category } from 'src/app/models/Category.model';
import { MatSnackBar } from '@angular/material';
import { ProductService } from '../../../services/product/product.service';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.sass']
})
export class ProductCreateComponent implements OnInit {

    form: FormGroup;
    categories: Observable<Category[]>;
    colors: Observable<Color[]>;
    progress: number;
    loading: boolean;

    constructor(public categoryService: CategoryService,
        public colorService: ColorService,
        private snackBar: MatSnackBar,
        private productService: ProductService) { }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.maxLength(250), Validators.minLength(5)]),
            price: new FormControl(null, [Validators.required, Validators.min(5)]),
            stock: new FormControl(null, [Validators.required, Validators.min(0)]),
            short_description: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(500)]),
            category_id: new FormControl(null, Validators.required),
            cover: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.minLength(10)),
            color_id: new FormControl(null)
        });

        this.colors = this.colorService.index();
        this.categories = this.categoryService.index();
    }

    store() {
        this.loading = true;
        this.productService.store(this.form.value).subscribe((data) => {
            this.progress = 0;
            this.loading = false;
            this.snackBar.open('Producto creado.', 'OK');
            this.form.reset();
        });
    }

}
