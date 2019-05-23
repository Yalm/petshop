import { CartItem } from "./CartItem.model";

export interface ShoppingCart {
    id: string;
    items: CartItem[],
    total: number
}