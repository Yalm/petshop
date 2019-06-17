import { DocumentReference } from '@angular/fire/firestore';
import { combineLatest, of, from, MonoTypeOperatorFunction } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function docJoin<T>(paths: string[]): MonoTypeOperatorFunction<T> {
    return input$ => {
        let parent;
        return input$.pipe(
            switchMap(data => {
                parent = data;
                const docs$ = paths.map(path => {
                    const ref: DocumentReference = data[path];
                    if (ref) {
                        return from(ref.get()).pipe(map(item => {
                            return { id: item.id, ...item.data() };
                        }));
                    }
                    return of(null);
                });
                return combineLatest<T>(docs$);
            }),
            map(arr => {
                const joins = paths.reduce((acc, cur, idx) => {
                    return { ...acc, [cur]: arr[idx] };
                }, {});
                return { ...parent, ...joins } as T;
            })
        )
    }
}
