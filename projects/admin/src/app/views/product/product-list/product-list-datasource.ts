import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable, merge, Subscription } from 'rxjs';
import { map, tap, switchMap, startWith } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

export class FirestoreDataSource<T> extends DataSource<T> {

    private next: string | number = 0;

    private pages = [];

    private action: string;
    filter: string;

    constructor(
        private paginator: MatPaginator,
        private afs: AngularFirestore,
        private collection: string,
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
            this.sort.sortChange
        ];

        return merge(...dataMutations).pipe(
            startWith({}),
            tap((data: any) => {
                if (data.active) {
                    this.next = 0;
                    this.pages = [];
                    this.action = 'sort';
                    this.paginator.pageIndex =  0;
                } else if (data.pageIndex > data.previousPageIndex) {
                    this.action = 'next';
                } else if (data.previousPageIndex > 0) {
                    this.action = 'back';
                }
            }),
            switchMap(() => {
                return this.afs.collection<T>(this.collection, ref => {
                    if (this.action == 'sort') {
                        return ref
                            .orderBy(this.sort.active, this.sort.direction as any)
                            .limit(this.paginator.pageSize)
                    } else if (this.action == 'next') {
                        return ref
                            .orderBy(this.sort.active, this.sort.direction as any)
                            .limit(this.paginator.pageSize)
                            .startAfter(this.next)
                    } else if (this.action == 'back') {
                        return ref
                            .orderBy(this.sort.active, this.sort.direction as any)
                            .limit(this.paginator.pageSize)
                            .startAt(this.pages[this.paginator.pageIndex])
                    } else {
                        return ref
                            .orderBy(this.sort.active, this.sort.direction as any)
                            .limit(this.paginator.pageSize)
                    }
                })
                    .valueChanges({ idField: 'id' })
                    .pipe(
                        tap(data => {
                            if (data.length > 0 && this.paginator.pageSize <= data.length) {
                                this.paginator.length = this.paginator.pageSize * 10;
                                this.next = data[data.length - 1][this.sort.active];
                                this.setPage(data);
                            } else {
                                this.paginator.length = this.paginator.pageSize;
                                this.setPage(data);
                            }
                        })
                    )
            })
        )
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() { }

    private setPage(value: any[]): void {
        if (value.length < 1) {
            return;
        }
        const data = value[0][this.sort.active];
        const exist: boolean = this.pages.find(x => x == data) ? true : false;

        if (!exist) {
            this.pages.push(data);
        }
    }
}
