import { CartItem } from './CartItem.model';

export class ShoppingCart {
    constructor(
        public id: string,
        public items?: CartItem[],
    ) { }

    public add({ cover, id, name, price, quantity, stock, url }: CartItem): string {
        const index: number = this.itemIndexOf(id);
        const cartItem = this.items[index];

        if (index < 0) {
            const ITEM: CartItem = { cover, id, name, price, quantity, stock, url } as CartItem;
            this.items.unshift(ITEM);
            return 'add';
        } else if (cartItem.quantity == cartItem.stock) {
            return null;
        } else {
            cartItem.quantity += quantity;
            if (cartItem.quantity > cartItem.stock) {
                cartItem.quantity = cartItem.stock;
            }
        }
        return 'update';
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

    public delete(id: string): void {
        const index = this.items.findIndex(x => x.id == id);
        if (index >= 0) {
            this.items.splice(index, 1);
        }
    }

    private itemIndexOf(id: string): number {
        return this.items.findIndex(x => x.id == id);
    }

    public convertInJson(id: string): any {
        const ITEM = this.items.find(x => x.id == id);
        return ITEM;
    }
}
