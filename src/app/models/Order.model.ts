import { CartItem } from './CartItem.model';
import { Customer } from '../views/auth/models/customer';

export interface Order {
    id: string;
    readonly customer: Customer;
    readonly state: StatusOrder;
    readonly products: CartItem[]
    readonly plus_info?: string;
    readonly payment?: Payment;
    readonly created_at: string;
    readonly state_id: number;
    readonly error_log: string;
}

interface StatusOrder {
    readonly id: string;
    readonly name: number;
}

interface Payment {
    readonly id: number;
    readonly payment_type_id: number;
    readonly payment_type: PaymentTypes;
    readonly amount: number;
    readonly reference_code?: string | number;
}

interface PaymentTypes {
    readonly id: number;
    readonly name: string;
}
