import { Order } from 'src/app/models/Order.model';

export interface Customer {
    id: string;
    email: string;
    avatar?: string;
    name: string;
    surnames?: string;
    document_id?: number;
    document_number?: number;
    phone?: number;
    orders_count?: number;
    orders?: Order[];
}
