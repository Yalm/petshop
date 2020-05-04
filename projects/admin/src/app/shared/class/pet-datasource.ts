import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';
import { Observable, merge } from 'rxjs';
import { map, tap, switchMap, startWith } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from 'src/app/models/Pagination.model';
import { Params } from '@angular/router';
import { EventEmitter } from '@angular/core';

export class PetDataSource<T> extends DataSource<T> {

    private query = new HttpParams();
    protected load: boolean;
    data: T[];

    set filter(value: string) {
        if (value) {
            this.query = this.query.set('search', value);
        } else {
            this.query = this.query.delete('search');
        }
        this.change.next(true);
    }

    set params(value: Params) {
        Object.keys(value).forEach(key => {
            this.query = this.query.set(key, value[key]);
        });
        this.change.next(true);
    }

    set paginator(value: MatPaginator) {
        this.options.paginator = value;
        this.connect();
    }

    set sort(value: MatSort) {
        this.options.sort = value;
        this.connect();
    }

    set http(value: HttpClient) {
        this.options.http = value;
        this.connect();
    }

    private change = new EventEmitter<boolean>();

    constructor(private options: {
        url: string,
        http: HttpClient,
        paginator?: MatPaginator,
        sort?: MatSort,
        params?: Params
    }) { super(); }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<T[]> {
        const dataMutations: EventEmitter<boolean | Sort | PageEvent>[] = [
            this.change
        ];

        if (this.options.paginator) {
            dataMutations.push(this.options.paginator.page);
        }

        if (this.options.sort) {
            dataMutations.push(this.options.sort.sortChange);
        }

        return merge(...dataMutations)
            .pipe(
                startWith({}),
                switchMap(() => this.getData())
            );
    }

    private getData(): Observable<T[]> {
        if (this.options.sort && this.options.sort.active) {
            if (this.options.sort.active != this.query.get('sort') && this.options.paginator) {
                this.options.paginator.pageIndex = 0;
            }
            this.query = this.query.set('sort', this.options.sort.active);
            this.query = this.query.append('order', this.options.sort.direction || 'asc');
        }

        if (this.options.paginator) {
            this.query = this.query.set('page', (this.options.paginator.pageIndex + 1).toString());
            this.query = this.query.set('results', this.options.paginator.pageSize.toString());
        }

        this.load = true;
        return this.options.http.get<Pagination<T>>(this.options.url, {
            params: this.query
        }).pipe(
            tap(response => {
                if (this.options.paginator) {
                    this.options.paginator.length = 1000;
                }
                this.data = response.data;
                this.load = false;
            }, () => {
                this.load = false;
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
        this.options.http.delete(`${this.options.url}/${id}`).subscribe(() => {
            this.change.next(true);
        });
    }
}
