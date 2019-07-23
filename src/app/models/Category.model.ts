export interface Category {
    readonly id: number;
    readonly name: string;
    readonly parent_id?: number;
    categories?: Category[];
}
