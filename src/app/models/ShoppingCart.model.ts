import { CartItem } from './CartItem.model';

export class ShoppingCart {
    constructor(
        public id: string,
        public items?: CartItem[],
    ) { }

    public add(item: CartItem): string {
        const index: number = this.itemIndexOf(item.id);
        const cartItem = this.items[index];

        if (index < 0) {
            this.items.unshift(item);
            return 'add';
        } else if (cartItem.quantity == cartItem.stock) {
            return null;
        } else {
            cartItem.quantity += item.quantity;
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
        if(index >= 0) {
            this.items.splice(index, 1);
        }
    }

    private itemIndexOf(id: string): number {
        return this.items.findIndex(x => x.id == id);
    }

    public convertInJson(id: string): any {
        const ITEM = this.items.find(x => x.id == id);
        return {
            id: ITEM.id,
            name: ITEM.name,
            url: ITEM.url,
            price: ITEM.price,
            cover: ITEM.cover,
            quantity: ITEM.quantity,
            stock: ITEM.stock
        }
    }
}
