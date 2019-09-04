import { CartItem } from './CartItem.model';

export class ShoppingCart {
    get subtotal() {
        return this.totalCart() - this.shipping;
    }

    constructor(
        public items: CartItem[],
        public shipping = 0
    ) { }

    public add(item: CartItem): boolean {
        const index: number = this.itemIndexOf(item.id);
        const cartItem = this.items[index];

        if (index < 0) {
            this.items.unshift(item);
            return true;
        } else if (cartItem.quantity === cartItem.stock && cartItem.stock === item.stock) {
            return false;
        } else {
            cartItem.stock = cartItem.stock !== item.stock ? item.stock : cartItem.stock;

            cartItem.quantity += item.quantity;
            if (cartItem.quantity > cartItem.stock) {
                cartItem.quantity = cartItem.stock;
            }
            return true;
        }
    }

    public totalCart(): number {
        let total = 0;
        this.items.map(item => total += item.quantity * item.price);
        total += this.shipping;
        return total;
    }

    public count(): number {
        let quantity = 0;
        this.items.map(item => quantity += item.quantity);
        return quantity;
    }

    public delete(id: number): void {
        const index = this.items.findIndex(x => x.id === id);
        if (index >= 0) {
            this.items.splice(index, 1);
        }
    }

    private itemIndexOf(id: number): number {
        return this.items.findIndex(x => x.id === id);
    }
}
