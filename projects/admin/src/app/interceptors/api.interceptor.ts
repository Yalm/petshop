import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let url: string = req.url[0] === '/' ? environment.apiUrl : `${environment.apiUrl}/`;

        const apiReq = req.clone({ url: `${url}${req.url}` });

        return next.handle(apiReq).pipe(
            filter(event => event instanceof HttpResponse),
            tap(() => { }, (event: HttpErrorResponse) => {
                if (event.status == 500) {
                    this.snackBar.open('Oops, ocurrio un error.', 'Ok', {
                        duration: 5000,
                        panelClass: ['bg-danger', 'text-white']
                    });
                }
            }))
    }
}
