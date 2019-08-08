import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader/loader.service';

@Injectable()

export class LoaderInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoaderService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.loaderService.hide();
            }
        },
            () => {
                this.loaderService.hide();
            }));
    }
}
