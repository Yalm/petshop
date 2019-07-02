import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable, merge, Subject, of } from 'rxjs';
import { map, tap, switchMap, startWith } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from 'src/app/models/Pagination.model';

interface UpdateDataSource {
    updated: boolean;
}

export class PetDataSource<T> extends DataSource<T> {

    filter: string;
    data: T[];
    private update = new Subject<UpdateDataSource>();

    constructor(private paginator: MatPaginator,
        private collection: string,
        private http: HttpClient,
        private sort?: MatSort) {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<T[]> {
        return merge(this.paginator.page, this.update.asObservable(), this.sort ? this.sort.sortChange : of(null))
            .pipe(
                startWith({}),
                switchMap(() => this.getData())
            )
    }

    updateData(): void {
        this.update.next({ updated: true });
    }

    private getData(): Observable<T[]> {
        let params = new HttpParams();
        params = params.append('page', (this.paginator.pageIndex + 1).toString());
        params = params.append('results', this.paginator.pageSize.toString());

        if (this.sort) {
            params = params.append('sort', this.sort.active);
            params = params.append('order', this.sort.direction || 'asc');
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
    disconnect() {
        this.update.complete();
    }
}
