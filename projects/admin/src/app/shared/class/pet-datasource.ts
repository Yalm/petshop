import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable, merge, of, Subject } from 'rxjs';
import { map, tap, switchMap, filter, startWith } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from 'src/app/models/Pagination.model';
import { Params } from '@angular/router';

export class PetDataSource<T> extends DataSource<T> {

    private paramsSet = new HttpParams();
    protected load: boolean;

    set filter(value: string) {
        if (value) {
            this.paramsSet = this.paramsSet.set('search', value);
        } else {
            this.paramsSet = this.paramsSet.delete('search');
        }
        this.paramsChange.next(true);
    }

    set params(value: Params) {
        Object.keys(value).forEach(key => {
            this.paramsSet = this.paramsSet.set(key, value[key]);
        });
        this.paramsChange.next(true);
    }

    data: T[];

    private destroyItem = new Subject<boolean>();
    private paramsChange = new Subject<boolean>();

    constructor(
        private paginator: MatPaginator,
        private collection: string,
        private http: HttpClient,
        private sort?: MatSort,
        params?: Params
    ) {
        super();
        if (params) {
            Object.keys(params).forEach(key => {
                this.paramsSet = this.paramsSet.set(key, params[key]);
            });
        }
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<T[]> {
        const dataMutations = [
            this.paginator.page,
            this.destroyItem,
            this.paramsChange,
            this.sort ? this.sort.sortChange : of(null)
        ];

        return merge(...dataMutations)
            .pipe(
                filter(data => data != null),
                startWith({}),
                switchMap(() => this.getData())
            );
    }

    private getData(): Observable<T[]> {

        this.paramsSet = this.paramsSet.append('page', (this.paginator.pageIndex + 1).toString());
        this.paramsSet = this.paramsSet.append('results', this.paginator.pageSize.toString());

        if (this.sort) {
            this.paramsSet = this.paramsSet.append('sort', this.sort.active);
            this.paramsSet = this.paramsSet.append('order', this.sort.direction || 'asc');
        }

        return this.http.get<Pagination<T>>(this.collection, {
            params: this.paramsSet
        })
            .pipe(
                tap(response => {
                    this.paginator.length = response.total;
                    this.data = response.data;
                }),
                map(response => response.data)
            );
    }
    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() { }

    destroy(id: number | string): void {
        this.http.delete(`${this.collection}/${id}`).subscribe(
            () => {
                this.destroyItem.next(true);
            }
        );
    }
}
