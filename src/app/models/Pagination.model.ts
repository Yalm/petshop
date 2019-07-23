export interface Pagination<T> {
    readonly current_page: number;
    readonly data: T[];
    readonly first_page_url: string;
    readonly from: number;
    readonly last_page: number;
    readonly last_page_url: string;
    readonly next_page_url: string;
    readonly path: string;
    readonly per_page: number;
    readonly prev_page_url: string;
    readonly to: number;
    readonly total: number;
}
