import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { LoaderService } from '../services/loader/loader.service';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {

    constructor(private snackBar: MatSnackBar, private loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const url: string = req.url[0] === '/' ? environment.apiUrl : `${environment.apiUrl}/`;

        const http = new RegExp('^(http|https)://', 'i');
        if (!/\.(gif|jpg|jpeg|tiff|png|svg|json)$/i.test(req.url)) {
            req = http.test(req.url) ? req : req.clone({ url: `${url}${req.url}` });
        }

        this.loaderService.show();

        return next.handle(req).pipe(
            filter(event => event instanceof HttpResponse),
            tap(() => {
                this.loaderService.hide();
            }, (event: HttpErrorResponse) => {
                if (event.status === 500) {
                    this.snackBar.open('Oops, ocurrio un error.', 'Ok', {
                        duration: 5000,
                        panelClass: ['bg-danger', 'text-white']
                    });
                }
                this.loaderService.hide();
            }));
    }
}
