import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { Category } from 'src/app/models/Category.model';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

    public year: number = new Date().getFullYear();
    public categories: Category[];

    constructor(private category: CategoryService) { }

    ngOnInit() {
        this.category.index().subscribe(data => this.categories = data);
    }

}
