import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.sass']
})

export class CategoryEditComponent implements OnInit {
    form: FormGroup;
    categories$: Observable<Category[]>;
    isChild: boolean;

    constructor(
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        const category = this.route.snapshot.data.category;
        this.isChild = category.parent_id ? true : false;
        this.changeChild(this.isChild, category);
        this.form = new FormGroup({
            id: new FormControl(category.id),
            name: new FormControl(category.name, [Validators.required, Validators.maxLength(191), Validators.minLength(5)]),
            parent_id: new FormControl(category.parent_id),
            categories: new FormControl(category.categories.map(x => x.id))
        });
    }


    changeChild(child: boolean, category: Category): void {
        if (child) {
            this.categories$ = this.categoryService.index({ onlyParents: true })
                .pipe(
                    map(response => response.filter(x => x.id !== category.id))
                );
        } else {
            this.categories$ = this.categoryService.index({ all: true })
                .pipe(
                    map(response =>
                        response.filter(x => x.id !== category.id && x.categories.length < 1 && x.parent_id === null)
                            .concat(response.filter(x => x.parent_id === category.id))
                    )
                );
        }
    }

    edit(): void {
        if (!this.isChild) {
            this.form.get('parent_id').setValue(null);
        } else {
            this.form.get('categories').setValue(null);
        }
        this.categoryService.update(this.form.value).subscribe(() => {
            this.snackBar.open('Categoría actualizada.', 'OK', { duration: 5000 });
        }, (error: HttpErrorResponse) => {
            if (error.status === 422) {
                this.form.get('name').setErrors({ unique: true });
            }
        });
    }
}
