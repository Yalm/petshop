import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/Color.model';
import { HttpClient } from '@angular/common/http';
import { Pagination } from 'src/app/models/Pagination.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ColorService {

    constructor(private http: HttpClient) { }

    public index(page: number = 1): Observable<Color[]> {
        return this.http.get<Pagination<Color>>(`colors?page=${page}`)
            .pipe(
                map(response => response.data)
            );
    }
}
