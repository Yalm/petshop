import { MatPaginator, MatSort } from '@angular/material';
import { Product } from 'src/app/models/Product.model';
import { DataSource } from '@angular/cdk/table';
import { Observable, merge, of, Subscription } from 'rxjs';
import { map, tap, switchMap, startWith } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

export class FirestoreDataSource<T> extends DataSource<T> {

    private subcription: Subscription;

    constructor(
        private paginator: MatPaginator,
        private afs: AngularFirestore,
        private collection: string,
        private sort?: MatSort) {
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
            this.sort ? this.sort.sortChange : of(null)
        ];

        return merge(...dataMutations).pipe(
            startWith({}),
            switchMap(() => {
                return this.afs.collection<T>(this.collection, ref => ref
                    .orderBy(this.sort.active || 'id', this.sort.direction as any || 'asc')
                    .startAfter(this.paginator.pageIndex)
                    .limit(this.paginator.pageSize))
                    .valueChanges({ idField: 'id' }).pipe(
                        tap(data => {
                            console.log(data);
                        })
                    )
            })
        )
    }

    filter: string;

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() { }
}
