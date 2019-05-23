import { Category } from './Category.model';
import { Color } from './Color.model';

export interface Product {
    readonly id: string;
    readonly name: string;
    readonly price: number;
    readonly cover: string;
    readonly url: string;
    readonly stock: number;
    readonly description: string;
    readonly short_description: string;
    category: Category;
    readonly color: Color;
}
