import { StatusOrder } from './StatusOrder.model';
import { CartItem } from './CartItem.model';
import { Payment } from './Payment.model';
import { Customer } from '../views/auth/models/customer';

export interface Order {
    readonly id: string;
    readonly customer: Customer;
    readonly status: StatusOrder;
    readonly products: CartItem[]
    readonly plus_info?: string;
    readonly payment?: Payment;
}
