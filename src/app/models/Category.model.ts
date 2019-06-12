export interface Category {
    readonly id: string;
    readonly name: string;
    readonly path?: string;
    categories: Category[];
}
