import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable, merge, BehaviorSubject, of, Subject } from 'rxjs';
import { map, tap, switchMap, filter } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from 'src/app/models/Pagination.model';

export class PetDataSource<T> extends DataSource<T> {

    set filter(value: string) {
        this._filterChange.next(value);
    }

    data: T[];
    private _filterChange = new BehaviorSubject<string>('');
    private _destroyItem = new Subject<boolean>();


    constructor(private paginator: MatPaginator,
        private collection: string,
        private http: HttpClient,
        private sort: MatSort) {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<T[]> {
        const dataMutations = [
            this.paginator.page,
            this._destroyItem.asObservable(),
            this._filterChange.asObservable(),
            this.sort ? this.sort.sortChange : of(null)
        ];

        return merge(...dataMutations)
            .pipe(
                filter(data => data != null),
                switchMap(() => this.getData())
            )
    }

    private getData(): Observable<T[]> {
        let params = new HttpParams();
        params = params.append('page', (this.paginator.pageIndex + 1).toString());
        params = params.append('results', this.paginator.pageSize.toString());

        if (this.sort) {
            params = params.append('sort', this.sort.active);
            params = params.append('order', this.sort.direction || 'asc');
        }

        if (this._filterChange.value) {
            params = params.append('search', this._filterChange.value);
        }

        return this.http.get<Pagination<T>>(this.collection, { params })
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
