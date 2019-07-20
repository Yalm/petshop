import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/Color.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ColorService {

    constructor(private http: HttpClient) { }

    public index(): Observable<Color[]> {
        return this.http.get<Color[]>('colors');
    }

    public store(data: Color): Observable<Color> {
        return this.http.post<Color>('colors', data);
    }

    public update(data: Color): Observable<Color> {
        return this.http.put<Color>(`colors/${data.id}`, data);
    }

    public destroy(id: number): Observable<Color> {
        return this.http.delete<Color>(`colors/${id}`);
    }
}
