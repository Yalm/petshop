import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category.model';
import { MatSnackBar } from '@angular/material';
import { CategoryService } from 'src/app/services/category/category.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-category-create',
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.sass']
})
export class CategoryCreateComponent implements OnInit {

    form: FormGroup;
    categories$: Observable<Category[]>;

    constructor(private categoryService: CategoryService,
                private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.maxLength(250), Validators.minLength(5)]),
            parent_id: new FormControl(null),
        });
        this.categories$ = this.categoryService.index();
    }

    store() {
        this.categoryService.store(this.form.value).subscribe(() => {
            this.snackBar.open('Categoría creada.', 'OK', { duration: 4000 });
            this.form.reset();
        }, (error: HttpErrorResponse) => {
            if (error.status === 422) {
                this.form.get('name').setErrors({ unique: true });
            }
        });
    }
}
