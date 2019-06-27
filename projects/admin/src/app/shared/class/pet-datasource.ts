import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable, merge, Subject } from 'rxjs';
import { map, tap, switchMap, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
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
        private sort: MatSort,
        private http: HttpClient) {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<T[]> {
        return merge(this.paginator.page, this.update.asObservable(), this.sort.sortChange)
            .pipe(
                startWith({}),
                switchMap(() => this.getData())
            )
    }

    updateData(): void {
        this.update.next({ updated: true });
    }

    private getData(): Observable<T[]> {
        return this.http.get<Pagination<T>>(`${this.collection}?page=${this.paginator.pageIndex + 1}&results=${this.paginator.pageSize}&sort=${this.sort.active}&order=${this.sort.direction || 'asc'}`)
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
