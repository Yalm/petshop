import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Category } from 'src/app/models/Category.model';
import { MatSnackBar, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { CategoryService } from 'src/app/services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.sass']
})

export class CategoryEditComponent implements OnInit {
    form: FormGroup;
    categories$: Observable<Category[]>;
    isChild: boolean;

    constructor(private categoryService: CategoryService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.route.params.pipe(
            switchMap(params => this.categoryService.show(params.id))
        ).subscribe(category => {
            this.isChild = category.parent_id ? true : false;
            this.form = new FormGroup({
                id: new FormControl(category.id),
                name: new FormControl(category.name, [Validators.required, Validators.maxLength(191), Validators.minLength(5)]),
                parent_id: new FormControl(category.parent_id),
                categories: new FormArray(
                    category.categories.reduce((controls: FormGroup[], element) => {
                        controls.push(this.addControl(element));
                        return controls;
                    }, [])
                )
            });
            this.changeChild(this.isChild);
        });
    }

    remove(index: number): void {
        const control = <FormArray>this.form.get('categories');
        control.removeAt(index);
    }

    add(event: MatChipInputEvent): void {
        console.log(event);
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const control = <FormArray>this.form.get('categories');
        const exist = control.value.find(x => x.id == event.option.value) ? false : true;
        if (exist) {
            control.push(this.addControl({ name: event.option.viewValue, id: event.option.value }));
        }
    }

    changeChild(child: boolean): void {
        if (child) {
            this.categories$ = this.categoryService.index({ all: true })
                .pipe(
                    map(response => response.filter(x => x.id != this.form.get('id').value && x.parent_id == null))
                );
        } else {
            this.categories$ = this.categoryService.index()
                .pipe(
                    map(response => response.filter(x => x.id != this.form.get('id').value && x.categories.length < 1))
                );
        }
    }

    store() {
        let data = this.form.value;
        if (!this.isChild) {
            data.parent_id = null;
            this.form.get('parent_id').setValue(null);
        }
        data.categories = data.categories.map(x => x.id);
        this.categoryService.update(data).subscribe(() => {
            this.snackBar.open('Categoría actulizada.', 'OK', { duration: 5000 });
        });
    }

    addControl(element?: Category): FormGroup {
        return new FormGroup({
            id: new FormControl(element ? element.id : null, [Validators.required]),
            name: new FormControl(element ? element.name : null, [Validators.required, Validators.maxLength(191), Validators.minLength(5)])
        })
    }

}
