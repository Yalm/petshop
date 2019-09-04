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

    ngOnInit(): void {
        const product = this.route.snapshot.data.product;
        this.form = new FormGroup({
            id: new FormControl(product.id, [Validators.required]),
            name: new FormControl(product.name, [Validators.required, Validators.maxLength(250), Validators.minLength(5)]),
            price: new FormControl(product.price, [Validators.required, Validators.min(5)]),
            stock: new FormControl(product.stock, [Validators.required, Validators.min(0)]),
            short_description: new FormControl(product.short_description,
                [Validators.required, Validators.minLength(5), Validators.maxLength(500)]
            ),
            category_id: new FormControl(product.category_id, Validators.required),
            cover: new FormControl(product.cover, Validators.required),
            description: new FormControl(product.description, Validators.minLength(10)),
            transport: new FormGroup({
                width: new FormControl(product.transport ? product.transport.width : null,
                    Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')),
                height: new FormControl(product.transport ? product.transport.height : null,
                    Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')),
                depth: new FormControl(product.transport ? product.transport.depth : null,
                    Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')),
                weight: new FormControl(product.transport ? product.transport.weight : null,
                    Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'))
            }),
            color_id: new FormControl(product.color_id)
        });

        this.colors = this.colorService.index();
        this.categories = this.categoryService.index();
    }

    edit(): void {
        this.productService.update(this.form.value).subscribe(() => {
            this.snackBar.open('Producto editado.', 'OK', { duration: 5000 });
        });
    }
}
