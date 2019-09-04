import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category.model';

@Component({
    selector: 'app-mega-menu',
    templateUrl: './mega-menu.component.html',
    styleUrls: ['./mega-menu.component.sass']
})
export class MegaMenuComponent {
    @Input() data: Observable<Category[]>;
}
