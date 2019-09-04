import { Product } from './Product.model';

export interface CartItem extends Product {
    quantity: number;
    pivot?: {
        quantity: number;
    };
}
