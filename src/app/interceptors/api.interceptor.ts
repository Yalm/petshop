import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let url: string = req.url[0] === '/' ? environment.apiUrl : `${environment.apiUrl}/`;

        const apiReq = req.clone({ url: `${url}${req.url}` });
        return next.handle(apiReq);
    }
}
