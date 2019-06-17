import { Category } from './Category.model';
import { Color } from './Color.model';
import { Observable } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';

export interface Product {
    readonly id: string;
    readonly name: string;
    readonly price: number;
    cover: Observable<string> | string;
    readonly url: string;
    stock: number;
    readonly description: string;
    readonly short_description: string;
    readonly category: DocumentReference | Category;
    readonly color: DocumentReference | Color;
}
