import { CartItem } from './CartItem.model';

export class ShoppingCart {
    constructor(
        public items: CartItem[]
    ) { }

    public add(item: CartItem): boolean {
        const index: number = this.itemIndexOf(item.id);
        let cartItem = this.items[index];

        if (index < 0) {
            this.items.unshift(item);
            return true;
        } else if (cartItem.quantity == cartItem.stock && cartItem.stock == item.stock) {
            return false;
        } else {
            cartItem.stock = cartItem.stock != item.stock ? item.stock : cartItem.stock;

            cartItem.quantity += item.quantity;
            if (cartItem.quantity > cartItem.stock) {
                cartItem.quantity = cartItem.stock;
            }
            return true;
        }
    }

    public totalCart(): number {
        let total: number = 0;
        this.items.map(item => total += item.quantity * item.price);
        return total;
    }

    public count(): number {
        let quantity: number = 0;
        this.items.map(item => quantity += item.quantity);
        return quantity;
    }

    public delete(id: number): void {
        const index = this.items.findIndex(x => x.id == id);
        if (index >= 0) {
            this.items.splice(index, 1);
        }
    }

    private itemIndexOf(id: number): number {
        return this.items.findIndex(x => x.id == id);
    }
}
