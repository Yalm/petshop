import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/Category.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

    year: number = new Date().getFullYear();
    categories$: Observable<Category[]>;

    constructor(private category: CategoryService) { }

    ngOnInit() {
        this.categories$ = this.category.index({ onlyChilds: true });
    }

}
