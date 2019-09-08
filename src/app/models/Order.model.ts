import { CartItem } from './CartItem.model';
import { Customer } from '../views/auth/models/customer';
import { Observable } from 'rxjs';

export interface Order {
    id: string;
    readonly customer: Customer;
    readonly state: StatusOrder;
    readonly products: CartItem[];
    readonly plus_info?: string;
    payment?: Payment;
    readonly created_at: string;
    readonly state_id: number;
    readonly error_log: string;
    readonly amount: number;
    readonly shipping?: Shipping;
}

interface StatusOrder {
    readonly id: string;
    readonly name: number;
}

export interface Shipping {
    readonly departament_id: string;
    readonly province_id: string;
    readonly district_id: string;
    readonly price: number;
    departament: Observable<string>;
    province: Observable<string>;
    distric: Observable<string>;
}

export interface Payment {
    readonly id: number;
    readonly payment_type_id: number;
    readonly payment_type: PaymentTypes;
    readonly amount: number;
    readonly md_icon: string;
    readonly created_at: string;
    readonly reference_code?: string | number;
}

interface PaymentTypes {
    readonly id: number;
    readonly name: string;
}
