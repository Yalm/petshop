import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IdentificationDocument } from 'src/app/models/IdentificationDocument.model';
import { HttpClient } from '@angular/common/http';
import { Pagination } from 'src/app/models/Pagination.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    constructor(private http: HttpClient) { }

    public index(page: number = 1): Observable<IdentificationDocument[]> {
        return this.http.get<Pagination<IdentificationDocument>>(`documents?page=${page}`)
            .pipe(
                map(response => response.data)
            );
    }
}
