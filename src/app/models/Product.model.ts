import { Category } from './Category.model';
import { Color } from './Color.model';

export interface Product {
    readonly id: number;
    readonly name: string;
    readonly price: number;
    readonly cover: string;
    readonly url: string;
    stock: number;
    readonly description: string;
    readonly short_description: string;
    readonly category_id: number;
    readonly category: Category;
    readonly color: Color;
    readonly transport?: Transport;
}

interface Transport {
    readonly id?: number;
    readonly depth: string;
    readonly height: number;
    readonly weight: string;
    readonly width: string;
}
