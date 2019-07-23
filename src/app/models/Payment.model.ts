export interface Payment {
    readonly id: number;
    readonly payment_type_id: number;
    readonly amount: number;
    readonly reference_code?: string | number;
}
