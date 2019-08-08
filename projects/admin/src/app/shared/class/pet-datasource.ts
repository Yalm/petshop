import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable, merge, of, Subject } from 'rxjs';
import { map, tap, switchMap, filter, startWith } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from 'src/app/models/Pagination.model';
import { Params } from '@angular/router';

export class PetDataSource<T> extends DataSource<T> {

    private _params = new HttpParams();
    protected load: boolean;

    set filter(value: string) {
        if (value) {
            this._params = this._params.set('search', value);
        } else {
            this._params = this._params.delete('search');
        }
        this._paramsChange.next(true);
    }

    set params(value: Params) {
        Object.keys(value).forEach(key => {
            this._params = this._params.set(key, value[key]);
        });
        this._paramsChange.next(true);
    }

    data: T[];

    private _destroyItem = new Subject<boolean>();
    private _paramsChange = new Subject<boolean>();

    constructor(private paginator: MatPaginator,
        private collection: string,
        private http: HttpClient,
        private sort?: MatSort,
        params?: Params) {
        super();
        params ? Object.keys(params).forEach(key => {
            this._params = this._params.set(key, params[key]);
        }) : null;
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<T[]> {
        const dataMutations = [
            this.paginator.page,
            this._destroyItem,
            this._paramsChange,
            this.sort ? this.sort.sortChange : of(null)
        ];

        return merge(...dataMutations)
            .pipe(
                filter(data => data != null),
                startWith({}),
                switchMap(() => this.getData())
            )
    }

    private getData(): Observable<T[]> {

        this._params = this._params.append('page', (this.paginator.pageIndex + 1).toString());
        this._params = this._params.append('results', this.paginator.pageSize.toString());

        if (this.sort) {
            this._params = this._params.append('sort', this.sort.active);
            this._params = this._params.append('order', this.sort.direction || 'asc');
        }

        return this.http.get<Pagination<T>>(this.collection, {
            params: this._params
        })
            .pipe(
                tap(response => {
                    this.paginator.length = response.total;
                    this.data = response.data;
                }),
                map(response => response.data)
            )
    }
    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() { }

    destroy(id: number | string): void {
        this.http.delete(`${this.collection}/${id}`).subscribe(
            () => {
                this._destroyItem.next(true);
            }
        )
    }
}
